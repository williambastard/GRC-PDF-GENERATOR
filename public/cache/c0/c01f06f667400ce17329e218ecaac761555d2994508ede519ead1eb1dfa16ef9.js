module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block cgublock %}
<div class="column__invoice full cgu">
    <div class="row__invoice full titre center">Modalités et conditions de règlement :</div>
    <div class="column__invoice lignes">
        <div class="column__invoice ligne">
            {% if (doc.modalites == "vir") %}
            <span>
                Par prélèvement ou par virement bancaire<br />
                Code B.I.C : xxxxxxxxxx<br />
                Code I.B.A.N : xxxxxxxxxxxxxxxxxxxxxxx<br />
            </span>
            <hr>
            {% endif %}
            {% if (doc.modalites == "esp") %}
            <span>
\t\t\tConformément au code monnaitaire et financier:
\t\t\t<a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006169847/2001-01-01/">Article L112-5</a>: En cas de paiement en billets et pièces, il appartient au débiteur de faire l'appoint.<br/>
\t\t\t<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036824549/">Article D112-3</a>:<br/>Les paiements en espèces sont limités à 1000 euros pour les résidents fiscal en France et 15.000€ pour un client non résident fiscalement en france.<br/>
\t\t\t\tNotre technicien peut refuser un paiement lorsque les billets lui semblent faux ou que le nombre total de pièces de monnaie dépasse 50, cependant, le nombre de billet n'est pas limité lorsque la somme totale ne dépasse pas 1000 euros.
            </span>
            <hr>
            {% endif %}
            <span>
                Ce devis est valable 30 jours.<br />
                Toute commande est soumise à l’acceptation préalable de <a href="https://www.etienne-services.fr/mentions-legales/#CGV"> nos conditions
                générales de vente</a><br />
            </span>
        </div>
    </div>
</div>
{% endblock %}`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\partials\\cgu.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['cgublock', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<div class="column__invoice full cgu">
    <div class="row__invoice full titre center">Modalités et conditions de règlement :</div>
    <div class="column__invoice lignes">
        <div class="column__invoice ligne">
            `);
                        if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 6, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `modalites`, new Map([]), `any`, false, false, false), `vir`))) {
                            outputBuffer.echo(`            <span>
                Par prélèvement ou par virement bancaire<br />
                Code B.I.C : xxxxxxxxxx<br />
                Code I.B.A.N : xxxxxxxxxxxxxxxxxxxxxxx<br />
            </span>
            <hr>
            `);
                        }
                        outputBuffer.echo(`            `);
                        if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 14, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `modalites`, new Map([]), `any`, false, false, false), `esp`))) {
                            outputBuffer.echo(`            <span>
\t\t\tConformément au code monnaitaire et financier:
\t\t\t<a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006169847/2001-01-01/">Article L112-5</a>: En cas de paiement en billets et pièces, il appartient au débiteur de faire l'appoint.<br/>
\t\t\t<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036824549/">Article D112-3</a>:<br/>Les paiements en espèces sont limités à 1000 euros pour les résidents fiscal en France et 15.000€ pour un client non résident fiscalement en france.<br/>
\t\t\t\tNotre technicien peut refuser un paiement lorsque les billets lui semblent faux ou que le nombre total de pièces de monnaie dépasse 50, cependant, le nombre de billet n'est pas limité lorsque la somme totale ne dépasse pas 1000 euros.
            </span>
            <hr>
            `);
                        }
                        outputBuffer.echo(`            <span>
                Ce devis est valable 30 jours.<br />
                Toute commande est soumise à l’acceptation préalable de <a href="https://www.etienne-services.fr/mentions-legales/#CGV"> nos conditions
                générales de vente</a><br />
            </span>
        </div>
    </div>
</div>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('cgublock', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};