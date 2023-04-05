import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = {
    code({node, inline, className, children, ...props}: any) {
        const match = /language-(\w+)/.exec(className || '');
        const finalChildren = String(children).replace(/\n$/, '');

        // const finalChildren = String(children).replace(/\n$/, '');

        return !inline ? (
            <SyntaxHighlighter
                showLineNumbers={true}
                children={finalChildren}
                style={atomDark} // theme
                language={match?match[1].toLowerCase():""}
                PreTag="section" // parent tag
                {...props}
            />
        ) : (
            <code className={className} {...props}>
                {finalChildren}
            </code>
        );
    },
};
export default CodeBlock;