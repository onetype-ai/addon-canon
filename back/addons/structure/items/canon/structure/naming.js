// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'naming',
        description: 'Folders separate words with a dash, files with a dot, everything lowercase.',
        check: (file, tree, walk, report) =>
        {
            const folders = (segments) =>
            {
                for(const segment of segments)
                {
                    if(segment !== '_' && !/^[a-z0-9-]+$/.test(segment))
                    {
                        report(1, 'Folder ' + segment + ' breaks naming, lowercase with dashes.');
                    }
                }
            };

            const match = file.match(/\/(back|front)\/(.+)$/);

            if(!match)
            {
                return;
            }

            const segments = match[2].split('/');
            const base = segments.pop();

            folders(segments);

            const nested = /\/items\/[^/]+\/[^/]+\/[^/]+\.js$/.test(file);
            const shape = nested ? /^[a-z0-9.+-]+\.js$/ : /^@?[a-z0-9.]+\.(js|css)$/;

            if(!shape.test(base))
            {
                report(1, 'File ' + base + ' breaks naming, lowercase with dots and the extension.');
            }
        }
    });
});
