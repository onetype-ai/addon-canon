// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'canon:back/walks',
        addon: 'canon',
        description: 'Walking a package reports the files living where nothing may, the folders holding nothing and the files nothing reaches.',
        callback: function({ assert })
        {
            this.canon = onetype.AddonGet('canon');
            this.root = new URL('../../../..', import.meta.url).pathname.replace(/\/$/, '');

            this.itself = () =>
            {
                const placed = this.canon.tree.violations(this.root);
                const reached = this.canon.reach.violations(this.root).filter((entry) => entry.rule !== 'tests');

                assert.equal(placed.length, 0, 'canon lives entirely where its own tree allows');
                assert.equal(reached.length, 0, 'and the barrel reaches every file it holds');
            };

            this.shaped = () =>
            {
                const answered = this.canon.tree.violations(this.root);

                assert.truthy(Array.isArray(answered), 'the tree walk answers a list');
                assert.truthy(Array.isArray(this.canon.reach.violations(this.root)), 'and so does the reach walk');
            };

            this.elsewhere = () =>
            {
                const absent = '/tmp/no-package-of-any-kind-lives-here';

                assert.equal(this.canon.reach.violations(absent).length, 0, 'a path with no manifest is not a package to reach through');
            };

            this.claimed = () =>
            {
                const tree = onetype.AddonGet('canon.tree');
                const paths = Object.values(tree.Items()).map((entry) => entry.Get('path'));

                assert.truthy(paths.includes('back/items/**/*.js'), 'the tree allows back items');
                assert.truthy(paths.includes('front/items/**/*.js'), 'and front items');
                assert.truthy(paths.some((path) => path.includes('LICENSE')), 'and asks for the license');
            };

            this.itself();
            this.shaped();
            this.elsewhere();
            this.claimed();
        }
    });
});
