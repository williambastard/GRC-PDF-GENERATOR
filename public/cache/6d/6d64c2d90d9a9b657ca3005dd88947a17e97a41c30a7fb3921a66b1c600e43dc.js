module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block productcontent %}
{% include "invoice-main/partials/products.html" %}
<section class="recapitulatifs">
  <section class="row__invoice full recapitulatif">
    {% include "invoice-main/partials//history.html" %}
    {% include "invoice-main/partials//total.html" %}
    {% include "invoice-main/partials//cgu.html"%}
  </section>
</section>
{% endblock %}
`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\preview\\products.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['productcontent', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/partials/products.html`, undefined, true, false, 2));
                        outputBuffer.echo(`<section class="recapitulatifs">
  <section class="row__invoice full recapitulatif">
    `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/partials//history.html`, undefined, true, false, 5));
                        outputBuffer.echo(`    `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/partials//total.html`, undefined, true, false, 6));
                        outputBuffer.echo(`    `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/partials//cgu.html`, undefined, true, false, 7));
                        outputBuffer.echo(`  </section>
</section>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('productcontent', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};