---
tags: [self-hosting]
authors: [bazzzilius]
---

# Shlink.io – сокращение ссылок на своем сервере

Недавно я решил настроить сервис для сокращения ссылок с помощью **[Shlink.io](https://shlink.io/)**. Меня привлекла возможность получить контроль над своим сервисом и настроить его под свои нужды. В этом посте делюсь своим опытом установки и настройки Shlink на сервере.

<!-- truncate -->

## Что такое Shlink.io?

**[Shlink.io](https://shlink.io/)** — это self-hosted инструмент для создания коротких URL и отслеживания их статистики. Удобен тем, что можно настроить под свои нужды и использовать с кастомным доменом. В моем случае я решил протестировать его на собственном сервере, используя Docker.
![caption](shlink-web-client.gif)

### Основные возможности, которые оказались полезны:
- Генерация коротких ссылок с собственным доменом.
- Статистика переходов (геолокация, устройства, рефереры).
- [API](https://shlink.io/documentation/api-docs/), которое можно интегрировать с другими проектами.

## Установка Shlink

Для развёртывания Shlink я использовал VPS на хостинге **[Aéza](/2024/09/25/2024/hosting-aeza)** и Docker. Вот команда, которую я использовал для установки:

```bash
docker run \
    --name my_shlink \
    -p 8080:8080 \
    -e DEFAULT_DOMAIN=<ВАШ_ДОМЕН> \
    -e IS_HTTPS_ENABLED=true \
    -e GEOLITE_LICENSE_KEY=<ВАШ_КЛЮЧ> \
    shlinkio/shlink:stable
```

Для использования функции геолокации Shlink требует ключ GeoLite, который можно получить, зарегистрировавшись [здесь](https://www.maxmind.com/en/geolite2/signup). Однако мне не удалось получить этот ключ, но даже без него система работает.

После успешной установки я сгенерировал API-ключ для доступа к [панели управления](https://app.shlink.io/) командой:

```bash
docker exec -it my_shlink shlink api-key:generate
```

Это позволит вам управлять Shlink через веб-интерфейс или интегрировать его с другими приложениями через API.

## Настройка домена

Для проксирования трафика на Shlink использовал **Nginx**. Ниже пример конфигурации, которая перенаправляет HTTP-запросы на HTTPS и проксирует их на локальный сервер Shlink:

```nginx
server {
    if ($host = <ВАШ_ДОМЕН>) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name <ВАШ_ДОМЕН>;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name <ВАШ_ДОМЕН>;
    ssl_certificate /etc/letsencrypt/live/<ВАШ_ДОМЕН>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<ВАШ_ДОМЕН>/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Эта конфигурация настроена для автоматического перенаправления с HTTP на HTTPS и проксирования запросов на сервер [Shlink](https://shlink.io/).

## Личный опыт

На мой взгляд, настройка прошла довольно гладко, и [Shlink](https://shlink.io/) оказался простым в использовании. Особенно полезными показались аналитические функции и возможность использования собственного домена. В итоге я получил инструмент, который позволяет не только создавать короткие ссылки, но и следить за статистикой переходов, что пригодится для личных проектов.

Если вам важно контролировать данные и вы хотите независимость от внешних сервисов — стоит попробовать развернуть [Shlink](https://shlink.io/) на своём сервере.