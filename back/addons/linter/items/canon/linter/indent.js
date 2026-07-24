// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.linter', (linter) =>
{
    linter.Item({
        id: 'indent',
        description: 'Indentation is spaces only, four per level, no tab characters anywhere.',
        check: (source, lines, report) =>
        {
            lines.forEach((line, index) =>
            {
                if(line.includes('\t'))
                {
                    report(index + 1, 'Tab character found, indentation is four spaces per level.');

                    return;
                }

                const leading = line.match(/^( +)\S/);

                if(leading && leading[1].length % 4 !== 0 && !/^ +\*/.test(line))
                {
                    report(index + 1, 'Indented by ' + leading[1].length + ' spaces, the step is four.');
                }
            });
        }
    });
});
