# 🚀 Автоматизация минификации кода

Этот пост описывает настройку GitHub Actions воркфлоу для автоматической минификации Lua-кода Garry's Mod сервера, создания zip-архива и публикации релиза. Воркфлоу упрощает деплой защищённого кода на продакшен-сервер, минимизируя риск утечек и ускоряя загрузку. Он вдохновлён постами [Garry's Mod - Минификация кода сервера](https://blog.amd-nick.me/gmod-minify) и [Дружим Garry's Mod сервер и Git правильно](https://blog.amd-nick.me/2024/12/30/gmod-git-setup) от _AMD_.

## Зачем это нужно?

Минификация кода GMod сервера:
- **Защищает код**: Минифицированный код сложнее разобрать при утечке (например, через ScriptHook или кражу сборки).
- **Ускоряет загрузку**: Уменьшение размера файлов может сократить время запуска сервера.
- **Автоматизирует деплой**: Воркфлоу позволяет автоматически готовить релиз для продакшен-сервера.

Пост [Garry's Mod - Минификация кода сервера](https://blog.amd-nick.me/gmod-minify) объясняет, как минификация делает код менее читаемым для злоумышленников и какие инструменты использовать (например, [xUnkNx/glua-minify](https://github.com/xUnkNx/glua-minify)). Пост [Дружим Garry's Mod сервер и Git правильно](https://blog.amd-nick.me/2024/12/30/gmod-git-setup) показывает, как настроить Git-репозиторий для GMod, исключая ненужные файлы (логи, кэш) и упрощая синхронизацию между DEV и PROD серверами с помощью VS Code Remote SSH.

## Воркфлоу

Ниже приведён GitHub Actions воркфлоу, который:
1. Запускается при создании тега с префиксом `v*` (например, `v1.0.0`).
2. Минифицирует клиентские и общие Lua-файлы в папке `addons`.
3. Создаёт zip-архив с минифицированным кодом.
4. Публикует архив как GitHub Release.

```yaml
name: GMod Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Lua
        run: |
          sudo apt-get update
          sudo apt-get install -y lua5.3

      - name: Download minify.lua
        run: |
          curl -O https://raw.githubusercontent.com/xUnkNx/glua-minify/main/minify.lua

      - name: Prepare build directory
        run: |
          rm -rf build
          mkdir build
          rsync -av \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "scripts" \
            --exclude "build" \
            --exclude ".*" \
            ./ build/

      - name: Minify client and shared Lua scripts
        run: |
          find ./build/addons -type f \( \
            -name "cl_*.lua" -o \
            -name "sh_*.lua" -o \
            -path "*/client/*.lua" -o \
            -path "*/shared/*.lua" -o \
            -path "*/autorun/*.lua" \
          \) | while read file; do
            echo "Minifying Lua file: $file"
            lua ./minify.lua minify "$file" > "$file.min" || cp -v "$file" "$file.min"
            mv "$file.min" "$file"
          done

      - name: Create release zip
        run: |
          cd build
          zip -r ../release.zip ./* -x "scripts/*" "build/*"
          cd ..

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: gmod-release
          path: release.zip

  release:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: gmod-release
          path: .

      - name: Publish GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: release.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Как это работает

1. **Триггер**: Воркфлоу запускается при создании тега (например, `git tag v1.0.0 && git push origin v1.0.0`).
2. **Шаги**:
   - Устанавливается Lua 5.3.
   - Скачивается [minify.lua](https://raw.githubusercontent.com/xUnkNx/glua-minify/main/minify.lua) для минификации.
   - Создаётся директория `build`, куда копируются файлы проекта, исключая `.git`, `.github`, `scripts`, `build` и скрытые файлы.
   - Минифицируются Lua-файлы (`cl_*.lua`, `sh_*.lua`, файлы в `client`, `shared`, `autorun`) с помощью `minify.lua`. Если минификация не удалась, файл копируется без изменений.
   - Создаётся zip-архив `release.zip` с минифицированным кодом.
   - Архив публикуется как GitHub Release.

## Полезные заметки

- **Минификатор**: Используется [xUnkNx/glua-minify](https://github.com/xUnkNx/glua-minify), который поддерживает синтаксис GMod (включая `!`, `!=`, `continue`), в отличие от стандартных Lua-минификаторов.
- **Git-интеграция**: Пост [Дружим Garry's Mod сервер и Git правильно](https://blog.amd-nick.me/2024/12/30/gmod-git-setup) рекомендует настроить `.gitignore` для исключения мусорных файлов (логи, кэш) и хранения только нужных (например, `/cfg/server.cfg`, `/lua/bin`, `/gamemodes/darkrp`). Это упрощает синхронизацию между DEV и PROD серверами.
- **Отладка**: Минифицированный код сложнее отлаживать. Используйте [GLuaFixer](https://github.com/FPtje/GLuaFixer) или Pretty Print в Visual Studio Code для форматирования кода при необходимости.
- **DEPLOY**: Для деплоя на сервер создайте скрипт `deploy.sh`, как описано в [посте о минификации](https://blog.amd-nick.me/gmod-minify), чтобы автоматизировать копирование архива на продакшен.

:::caution
Минифицированный код может быть сложен для отладки, так как сжимается в одну строку. Храните немодифицированный код на DEV-сервере и используйте PROD только для релизов.
:::

## Вдохновение

Этот воркфлоу создан на основе двух постов от _AMD_:
- [Garry's Mod - Минификация кода сервера](https://blog.amd-nick.me/gmod-minify) — объясняет, как минифицировать Lua-код для защиты от кражи и ускорения сервера, с использованием `xUnkNx/glua-minify`.
- [Дружим Garry's Mod сервер и Git правильно](https://blog.amd-nick.me/2024/12/30/gmod-git-setup) — показывает, как настроить Git-репозиторий для GMod, исключая ненужные файлы и упрощая удалённую разработку через VS Code Remote SSH.

## Благодарность amd-nick

Этот пост и весь мой блог вдохновлены работами _AMD_ (amd-nick) с [blog.amd-nick.me](https://blog.amd-nick.me). Его практичные, чёткие и полные юмора гайды по Garry's Mod, включая минификацию и настройку Git, помогли мне организовать свои проекты и начать делиться знаниями. AMD — настоящий мастер, чьи советы спасают от головной боли и делают разработку проще. Press F легенде! 🙌


import { Backlink } from "@koroligor/docusaurus-plugin-backlinks/components";

<Backlink documentPath="/docs/garrysmod/" />