module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% extends "invoice-main/preview/base.html" %}
{% block preview %}
<section class="column__invoice invoice preview">
  {% include "invoice-main/preview/header.html" %}
  {% include "invoice-main/preview/main.html" %}
  {% include "invoice-main/preview/footer.html" %}
</section>
{% endblock %}`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\preview.invoices.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['preview', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<section class="column__invoice invoice preview">
  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/preview/header.html`, undefined, true, false, 4));
                        outputBuffer.echo(`  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/preview/main.html`, undefined, true, false, 5));
                        outputBuffer.echo(`  `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/preview/footer.html`, undefined, true, false, 6));
                        outputBuffer.echo(`</section>
`);
                    }]
                ]);
            }

            doGetParent(context) {
                return this.loadTemplate(`invoice-main/preview/base.html`, 1).then((parent) => {
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