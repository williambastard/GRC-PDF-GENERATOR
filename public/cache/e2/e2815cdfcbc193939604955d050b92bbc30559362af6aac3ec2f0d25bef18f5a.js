module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block maincontent %}
<main class="column__invoice invoice-main m10p">
    {% include "invoice-main/preview/products.html" %}
</main>
{% endblock %}
`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\preview\\main.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['maincontent', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<main class="column__invoice invoice-main m10p">
    `);
                        outputBuffer.echo(await this.include(context, outputBuffer, `invoice-main/preview/products.html`, undefined, true, false, 3));
                        outputBuffer.echo(`</main>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('maincontent', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};