// based on:
// https://github.com/IceWhaleTech/ZimaDocs/blob/7ddfa8360dcab96126ca49ce6c2fa87394f20b63/src/theme/DocPaginator/index.js
// deleted comments front matter option and i18n

import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

export default function DocPaginatorWrapper(props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <DocPaginator {...props} />
      {(
        <div className="docusaurus-docs-comments">
          <Giscus
            id="comments"
            repo="BazZziliuS/docusaurus"
            repoId="R_kgDOMvs6kg"
            category="Comments"
            categoryId="DIC_kwDOMvs6ks4CiW1o"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={ colorMode === "dark" ? "dark_dimmed" : "light" }
            lang={ 'ru' }
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
