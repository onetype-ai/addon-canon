// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'functions.flat',
        description: 'No subfolders inside functions, the dot stays in the file name. Exposed is the single exception, and item functions allow none at all.',
        check: function(file, tree, walk, report)
        {
            this.nested = (inside) =>
            {
                if(file.includes('/item/functions/'))
                {
                    return report(1, 'Subfolder inside item functions, nothing nests there, not even exposed.');
                }

                if(!inside.startsWith('exposed/'))
                {
                    report(1, 'Subfolder inside functions, flatten it into a dot name.');
                }
            };

            const match = file.match(/\/functions\/(.+)$/);

            if(match && match[1].includes('/'))
            {
                this.nested(match[1]);
            }
        }
    });
});
