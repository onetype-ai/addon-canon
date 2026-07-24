// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'breathing',
        description: 'A blank line follows a closing brace before the next statement, blocks breathe.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                const next = lines[index + 1];

                if(next === undefined)
                {
                    return;
                }

                if(!/^\s*\}\)?;?\s*$/.test(line))
                {
                    return;
                }

                if(next.trim() === '' || /^\s*[}\])]/.test(next) || /^\s*(else|catch|finally)\b/.test(next))
                {
                    return;
                }

                report(index + 2, 'The next statement rides the closing brace, a blank line goes between.');
            });
        }
    });
});
