// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'back/answers',
        addon: 'canon',
        description: 'Reading one file answers every violation on it, each naming the rule, the file, the line and the fix.',
        callback: function({ assert })
        {
            this.canon = onetype.AddonGet('canon');
            this.here = new URL('.', import.meta.url).pathname;

            this.clean = () =>
            {
                const answered = this.canon.violations(this.here + 'answers.js');

                assert.equal(answered.length, 0, 'this very file obeys the canon it proves');
            };

            this.shaped = () =>
            {
                const broken = this.canon.violations(new URL('../../../addon.js', import.meta.url).pathname);

                assert.truthy(Array.isArray(broken), 'the answer is always a list');
            };

            this.absent = () =>
            {
                assert.truthy(this.canon.violations, 'violations is the exposed way in');
                assert.equal(typeof this.canon.violations, 'function', 'and it is a function');
            };

            this.layers = () =>
            {
                ['linter', 'ast', 'structure', 'patterns', 'placements', 'tree', 'reach'].forEach((layer) =>
                {
                    assert.truthy(onetype.AddonGet('canon.' + layer), 'the ' + layer + ' layer stands');
                });
            };

            this.reaching = () =>
            {
                assert.equal(typeof this.canon.tree.violations, 'function', 'the tree layer answers for a package');
                assert.equal(typeof this.canon.reach.violations, 'function', 'and so does the reach layer');
            };

            this.clean();
            this.shaped();
            this.absent();
            this.layers();
            this.reaching();
        }
    });
});
