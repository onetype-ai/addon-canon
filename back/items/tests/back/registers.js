// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'back/registers',
        addon: 'canon',
        description: 'Registering a package walks it and enters every sub addon under it as its own entry, so one call covers the whole tree beneath.',
        callback: function({ assert })
        {
            this.canon = onetype.AddonGet('canon');
            this.root = new URL('../../../..', import.meta.url).pathname.replace(/\/$/, '');

            this.entered = () =>
            {
                this.canon.Item({
                    id: 'proof.package',
                    addon: 'proof.package',
                    path: {
                        back: this.root + '/back'
                    }
                });

                assert.truthy(this.canon.ItemGet('proof.package'), 'the package itself is entered');
            };

            this.beneath = () =>
            {
                const under = Object.keys(this.canon.Items()).filter((key) => key.startsWith('proof.package.'));

                assert.truthy(under.length >= 7, 'every sub addon beneath is entered too, ' + under.length + ' of them');
                assert.truthy(under.includes('proof.package.linter'), 'the linter among them');
                assert.truthy(under.includes('proof.package.reach'), 'and the reach');
            };

            this.sided = () =>
            {
                const entry = this.canon.ItemGet('proof.package.ast');

                assert.truthy(entry, 'a sub addon entry stands on its own');
                assert.match(entry.Get('path').back, '/addons/ast', 'and points at the folder it came from');
            };

            this.entered();
            this.beneath();
            this.sided();
        }
    });
});
