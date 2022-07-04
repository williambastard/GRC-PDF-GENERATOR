module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block totalsblock %}
<div class="column__invoice totaux">
  <div class="row__invoice full titre center">TOTAL DÛ</div>
  <div class="column__invoice lignes">
    <div class="row__invoice ligne space-between reduction">
      <span><b>RÉDUCT° H.T</b></span>
      <span><b>{{ doc.produits.total.prixReduc | default("0") | number_format(2, '.', ',') }} &euro;</b></span>
    </div>
    <div class="row__invoice ligne space-between">
      <span>PRIX H.T</span>
      <span>{{ doc.produits.total.prixHTTotal | default("0") | number_format(2, '.', ',') }} &euro;</span>
    </div>
    <div class="row__invoice ligne space-between">
      <span>COÛT TVA</span>
      <span>{{ (doc.produits.total.prixTTCTotal - doc.produits.total.prixHTTotal) | default("0") | number_format(2, '.', ',') }} &euro;</span>
    </div>
    <div class="row__invoice ligne space-between lastprice">
      <span><b>PRIX TTC</b></span>
      <span><b>{{ doc.produits.total.prixTTCTotal | default("0") | number_format(2, '.', ',') }} &euro;</b></span>
    </div>
  </div>
</div>
{% endblock %}
`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\partials\\total.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['totalsblock', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<div class="column__invoice totaux">
  <div class="row__invoice full titre center">TOTAL DÛ</div>
  <div class="column__invoice lignes">
    <div class="row__invoice ligne space-between reduction">
      <span><b>RÉDUCT° H.T</b></span>
      <span><b>`);
                        outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(7, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, true, false), `total`, new Map([]), `any`, false, true, false), `prixReduc`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(7, this.source)(...[await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 7, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false), `total`, new Map([]), `any`, false, false, false), `prixReduc`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                        outputBuffer.echo(` &euro;</b></span>
    </div>
    <div class="row__invoice ligne space-between">
      <span>PRIX H.T</span>
      <span>`);
                        outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(11, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, true, false), `total`, new Map([]), `any`, false, true, false), `prixHTTotal`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(11, this.source)(...[await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false), `total`, new Map([]), `any`, false, false, false), `prixHTTotal`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                        outputBuffer.echo(` &euro;</span>
    </div>
    <div class="row__invoice ligne space-between">
      <span>COÛT TVA</span>
      <span>`);
                        outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(15, this.source)(...[this, await this.environment.getFilter('default').traceableCallable(15, this.source)(...[(await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false), `total`, new Map([]), `any`, false, false, false), `prixTTCTotal`, new Map([]), `any`, false, false, false) - await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 15, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false), `total`, new Map([]), `any`, false, false, false), `prixHTTotal`, new Map([]), `any`, false, false, false)), `0`]), 2, `.`, `,`]));
                        outputBuffer.echo(` &euro;</span>
    </div>
    <div class="row__invoice ligne space-between lastprice">
      <span><b>PRIX TTC</b></span>
      <span><b>`);
                        outputBuffer.echo(await this.environment.getFilter('number_format').traceableCallable(19, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, true, false), `total`, new Map([]), `any`, false, true, false), `prixTTCTotal`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(19, this.source)(...[await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, await this.traceableMethod(this.getAttribute, 19, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `produits`, new Map([]), `any`, false, false, false), `total`, new Map([]), `any`, false, false, false), `prixTTCTotal`, new Map([]), `any`, false, false, false), `0`])) : (`0`)), 2, `.`, `,`]));
                        outputBuffer.echo(` &euro;</b></span>
    </div>
  </div>
</div>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('totalsblock', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};