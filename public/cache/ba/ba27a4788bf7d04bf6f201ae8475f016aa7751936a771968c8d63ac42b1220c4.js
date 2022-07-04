module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block historyblock %}
<div class="column__invoice paiements">
    <div class="row__invoice full titre">Règlement(s) effectué(s)</div>
    <div class="column__invoice lignes">
        {% for paiement in doc.paiements %}
        <div class="row__invoice ligne">
            <span>Paiement le <b>{{ paiement.date | default("") | date('d/m/Y à H:i:s') }}</b> en
                {% if (paiement.type == "vir") %}
                <b>VIREMENT ({{ paiement.details_last4 }})</b>
                {% endif %}
                {% if (paiement.type == "cb") %}
                <b>CB ({{ paiement.details_last4 }})</b>
                {% endif %}
                {% if (paiement.type == "esp") %}
                <b>ESPÈCES</b>
                {% endif %}
                {% if (paiement.type == "chq") %}
                <b>CHÈQUE</b>
                {% endif %}
                de <b>{{ paiement.montant | default("0") | number_format(2, '.', ',') }}&nbsp;</b>&euro;
            </span>
        </div>
        {% endfor %}
    </div>
</div>
{% endblock %}`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\partials\\history.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['historyblock', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<div class="column__invoice paiements">
    <div class="row__invoice full titre">Règlement(s) effectué(s)</div>
    <div class="column__invoice lignes">
        `);
                        context.set('_parent', context.clone());

                        await (async () => {
                            let c = this.ensureTraversable(await this.traceableMethod(this.getAttribute, 5, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `paiements`, new Map([]), `any`, false, false, false));

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
                            context.proxy[`paiement`] = __value__;
                            outputBuffer.echo(`        <div class="row__invoice ligne">
            <span>Paiement le <b>`);
                            outputBuffer.echo(await this.environment.getFilter('date').traceableCallable(7, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `date`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(7, this.source)(...[await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `date`, new Map([]), `any`, false, false, false), ``])) : (``)), `d/m/Y à H:i:s`]));
                            outputBuffer.echo(`</b> en
                `);
                            if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 8, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `type`, new Map([]), `any`, false, false, false), `vir`))) {
                                outputBuffer.echo(`                <b>VIREMENT (`);
                                outputBuffer.echo(await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `details_last4`, new Map([]), `any`, false, false, false));
                                outputBuffer.echo(`)</b>
                `);
                            }
                            outputBuffer.echo(`                `);
                            if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `type`, new Map([]), `any`, false, false, false), `cb`))) {
                                outputBuffer.echo(`                <b>CB (`);
                                outputBuffer.echo(await this.traceableMethod(this.getAttribute, 12, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `details_last4`, new Map([]), `any`, false, false, false));
                                outputBuffer.echo(`)</b>
                `);
                            }
                            outputBuffer.echo(`                `);
                            if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 14, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `type`, new Map([]), `any`, false, false, false), `esp`))) {
                                outputBuffer.echo(`                <b>ESPÈCES</b>
                `);
                            }
                            outputBuffer.echo(`                `);
                            if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 17, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `type`, new Map([]), `any`, false, false, false), `chq`))) {
                                outputBuffer.echo(`                <b>CHÈQUE</b>
                `);
                            }
                            outputBuffer.echo(`                de <b>`);
                            outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(20, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 20, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `montant`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(20, this.source)(...[await this.traceableMethod(this.getAttribute, 20, this.source)(this.environment, (context.has(`paiement`) ? context.get(`paiement`) : null), `montant`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                            outputBuffer.echo(`&nbsp;</b>&euro;
            </span>
        </div>
        `);
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
                            context.delete('paiement');
                            context.delete('_parent');
                            context.delete('loop');
                            for (let [k, v] of parent) {
                                if (!context.has(k)) {
                                    context.set(k, v);
                                }
                            }
                        })();
                        outputBuffer.echo(`    </div>
</div>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('historyblock', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};