module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block productsblock %}
<div class="table-container produits" role="table" aria-label="Produits">
  <div class="flex-table header" role="rowgroup">
    <div class="flex-row first description" role="columnheader">Description</div>
    <div class="flex-row qte" role="columnheader">Qté</div>
    <div class="flex-row red" role="columnheader">Réduct°</div>
    <div class="flex-row tva" role="columnheader">TVA</div>
    <div class="flex-row pu" role="columnheader">PU HT</div>
  </div>
  {% for produit in doc.produits %} {% if (produit.quantite > 0) %}
  <div class="flex-table row__invoice produits" role="rowgroup">
    <div class="flex-row first description" role="cell">
      <div class="row__invoice produit">
        <img src="{{ produit.produitimage | escape }}" width="48" height="48" />
        <span>{{ produit.description | escape }}</span>
      </div>
    </div>
    <div class="flex-row qte" role="cell">{{ produit.quantite | default("0")| number_format(2, '.', ',') }}</div>
    <div class="flex-row red" role="cell">{{ produit.reduction | default("0")| number_format(2, '.', ',') }}</div>
    <div class="flex-row tva" role="cell">{{ produit.prixTVA | default("0")| number_format(2, '.', ',') }}%</div>
    <div class="flex-row pu" role="cell">{{ produit.prixHT | default("0")| number_format(2, '.', ',') }} &euro;</div>
  </div>
  {% endif %} {% endfor %}
</div>
{% endblock %}
`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\partials\\products.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['productsblock', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<div class="table-container produits" role="table" aria-label="Produits">
  <div class="flex-table header" role="rowgroup">
    <div class="flex-row first description" role="columnheader">Description</div>
    <div class="flex-row qte" role="columnheader">Qté</div>
    <div class="flex-row red" role="columnheader">Réduct°</div>
    <div class="flex-row tva" role="columnheader">TVA</div>
    <div class="flex-row pu" role="columnheader">PU HT</div>
  </div>
  `);
                        context.set('_parent', context.clone());

                        await (async () => {
                            let c = this.ensureTraversable(await this.traceableMethod(this.getAttribute, 10, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false));

                            if (c === context) {
                                context.set('_seq', context.clone());
                            }
                            else {
                                context.set('_seq', c);
                            }
                        })();

                        context.set('loop', new Map([
                          ['parent', context.get('_parent')],
                          ['index0', 0],
                          ['index', 1],
                          ['first', true]
                        ]));
                        if ((typeof context.get('_seq') === 'object') && this.isCountable(context.get('_seq'))) {
                            let length = this.count(context.get('_seq'));
                            let loop = context.get('loop');
                            loop.set('revindex0', length - 1);
                            loop.set('revindex', length);
                            loop.set('length', length);
                            loop.set('last', (length === 1));
                        }
                        await this.iterate(context.get('_seq'), async (__key__, __value__) => {
                            context.proxy[`_key`] = __key__;
                            context.proxy[`produit`] = __value__;
                            outputBuffer.echo(` `);
                            if (this.evaluate((await this.traceableMethod(this.getAttribute, 10, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `quantite`, new Map([]), `any`, false, false, false) > 0))) {
                                outputBuffer.echo(`  <div class="flex-table row__invoice produits" role="rowgroup">
    <div class="flex-row first description" role="cell">
      <div class="row__invoice produit">
        <img src="`);
                                outputBuffer.echo(await this.environment.getFilter('escape').traceableCallable(14, this.source)(...[this, await this.traceableMethod(this.getAttribute, 14, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `produitimage`, new Map([]), `any`, false, false, false)]));
                                outputBuffer.echo(`" width="48" height="48" />
        <span>`);
                                outputBuffer.echo(await this.environment.getFilter('escape').traceableCallable(15, this.source)(...[this, await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `description`, new Map([]), `any`, false, false, false)]));
                                outputBuffer.echo(`</span>
      </div>
    </div>
    <div class="flex-row qte" role="cell">`);
                                outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(18, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 18, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `quantite`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(18, this.source)(...[await this.traceableMethod(this.getAttribute, 18, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `quantite`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                                outputBuffer.echo(`</div>
    <div class="flex-row red" role="cell">`);
                                outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(19, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `reduction`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(19, this.source)(...[await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `reduction`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                                outputBuffer.echo(`</div>
    <div class="flex-row tva" role="cell">`);
                                outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(20, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 20, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `prixTVA`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(20, this.source)(...[await this.traceableMethod(this.getAttribute, 20, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `prixTVA`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                                outputBuffer.echo(`%</div>
    <div class="flex-row pu" role="cell">`);
                                outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(21, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 21, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `prixHT`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(21, this.source)(...[await this.traceableMethod(this.getAttribute, 21, this.source)(this.environment, (context.has(`produit`) ? context.get(`produit`) : null), `prixHT`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                                outputBuffer.echo(` &euro;</div>
  </div>
  `);
                            }
                            outputBuffer.echo(` `);
                            (() => {
                                let loop = context.get('loop');
                                loop.set('index0', loop.get('index0') + 1);
                                loop.set('index', loop.get('index') + 1);
                                loop.set('first', false);
                                if (loop.has('length')) {
                                    loop.set('revindex0', loop.get('revindex0') - 1);
                                    loop.set('revindex', loop.get('revindex') - 1);
                                    loop.set('last', loop.get('revindex0') === 0);
                                }
                            })();
                        });
                        (() => {
                            let parent = context.get('_parent');
                            context.delete('_seq');
                            context.delete('_iterated');
                            context.delete('_key');
                            context.delete('produit');
                            context.delete('_parent');
                            context.delete('loop');
                            for (let [k, v] of parent) {
                                if (!context.has(k)) {
                                    context.set(k, v);
                                }
                            }
                        })();
                        outputBuffer.echo(`</div>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('productsblock', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};