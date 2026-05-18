window.addEventListener('load', () => {
    const codeBlocks = document.querySelectorAll('figure.highlight');
    if (!codeBlocks.length) return;

    const addCopyButton = codeBlock => {
        const copyWrapper = document.createElement('div');
        copyWrapper.setAttribute('class', 'codeblock-copy-wrapper');

        let copiedTimeout = null;

        copyWrapper.addEventListener('click', ev => {
            ev.preventDefault();
            ev.stopPropagation();
            
            const preElement = codeBlock.querySelector('.code pre');
            if (!preElement) {
                console.error('Copy failed: code block not found');
                return;
            }

            let copiedCode = '';
            const lineSpans = preElement.querySelectorAll('span.line');
            
            if (lineSpans.length > 0) {
                lineSpans.forEach((span, index) => {
                    if (index > 0) copiedCode += '\n';
                    copiedCode += span.textContent || span.innerText || '';
                });
            } else {
                copiedCode = preElement.textContent || preElement.innerText || '';
            }

            navigator.clipboard.writeText(copiedCode.trimEnd()).then(() => {
                if (copiedTimeout) clearTimeout(copiedTimeout);
                copyWrapper.classList.add('codeblock-copy-wrapper-copied');
                copiedTimeout = setTimeout(() => {
                    copyWrapper.classList.remove('codeblock-copy-wrapper-copied');
                    copiedTimeout = null;
                }, 2000);
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        });
        
        codeBlock.appendChild(copyWrapper);
    };

    codeBlocks.forEach(addCopyButton);
});
