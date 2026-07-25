// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

import '#canon/back/addons/linter/load.js';
import '#canon/back/addons/ast/load.js';
import '#canon/back/addons/placements/load.js';
import '#canon/back/addons/patterns/load.js';
import '#canon/back/addons/structure/load.js';
import '#canon/back/addons/tree/load.js';
import '#canon/back/addons/reach/load.js';

import '#canon/back/functions/find.subaddons.js';
import '#canon/back/item/catch/added.js';
import '#canon/back/items/canon/canon.js';
import '#canon/back/items/commands/rules.js';

import '#canon/back/functions/assert.violations.js';
import '#canon/back/functions/exposed/violations.js';

import '#canon/back/items/tests/back/answers.js';
import '#canon/back/items/tests/back/lists.js';
import '#canon/back/items/tests/back/obeys.js';
import '#canon/back/items/tests/back/reads.js';
import '#canon/back/items/tests/back/registers.js';
import '#canon/back/items/tests/back/walks.js';

export default canon;
