// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'steps',
        description: 'Every named step stands above the work that calls it. State the steps share may sit with them, a call, a branch or a loop may not.',
        check: function(tree, walk, report)
        {
            this.kinds = () =>
            {
                return ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'];
            };

            this.step = (statement) =>
            {
                if(statement.type === 'VariableDeclaration')
                {
                    return statement.declarations.every((declaration) =>
                    {
                        return !!declaration.init
                            && this.kinds().includes(declaration.init.type);
                    });
                }

                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'AssignmentExpression'
                    && statement.expression.left.type === 'MemberExpression'
                    && statement.expression.left.object.type === 'ThisExpression'
                    && this.kinds().includes(statement.expression.right.type);
            };

            this.carried = (statement) =>
            {
                return statement.type === 'ExpressionStatement'
                    && statement.expression.type === 'AssignmentExpression'
                    && statement.expression.left.type === 'MemberExpression'
                    && statement.expression.left.object.type === 'ThisExpression';
            };

            this.loose = (node) =>
            {
                if(node.type === 'ArrowFunctionExpression')
                {
                    return null;
                }

                return node.body.body.find((statement) =>
                {
                    return this.step(statement)
                        && !this.carried(statement);
                });
            };

            this.data = (statement) =>
            {
                if(statement.type === 'VariableDeclaration')
                {
                    return true;
                }

                return this.carried(statement)
                    || statement.type === 'ReturnStatement';
            };

            this.late = (body) =>
            {
                let work = null;

                for(const statement of body)
                {
                    if(this.step(statement) && work)
                    {
                        return { statement, work };
                    }

                    if(!this.step(statement) && !this.data(statement))
                    {
                        work = work ? work : statement;
                    }
                }

                return null;
            };

            this.order = (found) =>
            {
                if(found)
                {
                    report(
                        found.statement.loc.start.line,
                        'This step is named after the work on line ' + found.work.loc.start.line + ' already began. '
                            + 'Every step moves above that line, so the function names all its parts before it tells the story. '
                            + 'State the steps share may stay up there with them, only a call, a branch or a loop has to wait.'
                    );
                }
            };

            this.carrier = (loose) =>
            {
                if(loose)
                {
                    report(
                        loose.loc.start.line,
                        'This function carries its own this, so the step goes on it, this.name = () => {}. '
                            + 'A const step belongs to an arrow, which has no this of its own.'
                    );
                }
            };

            walk((node) =>
            {
                if(!this.kinds().includes(node.type) || !node.body || node.body.type !== 'BlockStatement')
                {
                    return;
                }

                this.order(this.late(node.body.body));
                this.carrier(this.loose(node));
            });
        }
    });
});
