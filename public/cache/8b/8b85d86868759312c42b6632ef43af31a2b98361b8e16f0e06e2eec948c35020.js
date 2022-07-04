module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% extends "invoices.base.html" %}
{% block invoices %}
<section class="column__invoice invoice">
  {% include "invoice-main/header-content.html" %}
  {% include "invoice-main/main-content.html" %}
  {% include "invoice-main/footer-content.html" %}
</section>
{% endblock %}`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoices.invoices.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['invoices', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<section class="column__invoice invoice">
  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/header-content.html`, undefined, true, false, 4));
                        outputBuffer.echo(`  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/main-content.html`, undefined, true, false, 5));
                        outputBuffer.echo(`  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/footer-content.html`, undefined, true, false, 6));
                        outputBuffer.echo(`</section>
`);
                    }]
                ]);
            }

            doGetParent(context) {
                return this.loadTemplate(`invoices.base.html`, 1).then((parent) => {
                    this.parent = parent;

                    return parent;
                });
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                await (await this.getParent(context)).display(context, this.merge(await this.getBlocks(), blocks), outputBuffer);
            }

            get isTraitable() {
                return false;
            }

        }],
    ]);
};