// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'canon:back/obeys',
        addon: 'canon',
        description: 'Canon holds itself to every rule it enforces, so a law its own author could not live under never gets written.',
        callback: function({ assert })
        {
            this.canon = onetype.AddonGet('canon');
            this.root = new URL('../../../..', import.meta.url).pathname.replace(/\/$/, '');

            this.files = () =>
            {
                return onetype.assets.read(this.root + '/back');
            };

            this.reading = () =>
            {
                const found = this.files();

                assert.truthy(found.length > 100, 'canon carries ' + found.length + ' files to hold itself to');
            };

            this.obeying = () =>
            {
                const broken = [];

                this.files().forEach((file) =>
                {
                    this.canon.violations(file).forEach((entry) =>
                    {
                        broken.push(entry.rule + ' on ' + file.replace(this.root + '/', '') + ':' + entry.line);
                    });
                });

                assert.equal(broken.length, 0, broken.length ? broken.slice(0, 5).join(', ') : 'every file obeys');
            };

            this.manifests = () =>
            {
                ['package.json', 'onetype.json'].forEach((name) =>
                {
                    const answered = this.canon.violations(this.root + '/' + name);

                    assert.equal(answered.length, 0, name + ' holds the shape a manifest takes');
                });
            };

            this.reading();
            this.obeying();
            this.manifests();
        }
    });
});
