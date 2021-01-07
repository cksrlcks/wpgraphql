import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {okaidia} from 'react-syntax-highlighter/dist/esm/styles/prism';

export const PostCode = ({language, children}) => {
      const lang = language.replace('wp-block-code', '').replace(/ /gi, "");
      return(
        <SyntaxHighlighter
      style={okaidia}
      language={lang}>
      {children}
    </SyntaxHighlighter>
    
      )
};