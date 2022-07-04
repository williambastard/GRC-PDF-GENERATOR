module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block headercontent %}
<header class="column__invoice invoice-header m10p">
    <div class="row__invoice full-header full align-items-center">
        <span class="row__invoice align-items-center">
            <img
                 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPiAgDQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojNTg3MjdGO30NCgkuc3Qye2ZpbGw6IzQ4OTVCQzt9DQoJLnN0M3tmaWxsOiM1MkE5REQ7fQ0KCS5zdDR7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQoJLnN0NXtmaWxsOiM4ODhFOEU7fQ0KCS5zdDZ7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+PHJlY3QgY2xhc3M9InN0MCIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI2NDAiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTA4LjUgNjMwLjRjLTEuMy0xMzcuNC0xLjMtMjczLjUtMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNEMzOTEgNTkuMSA0MzguNSAxMDQuMSA0ODQuNyAxNDl2LTQ3LjVjMC0yLjYgMC0xNC4xIDcuNy0yNC40IDYuNC03LjcgMTQuMS0xMC4zIDE4LTExLjYgMTQuMS01LjEgMjcgMCAzMC44IDIuNiAzLjkgMS4zIDEwLjMgNS4xIDE1LjQgMTEuNiAwIDAgNi40IDYuNCA2LjQgMTUuNCAwIDEzNi4xIDAgMjcwLjkgMCA0MDdIMzM1LjhsLTIwOCAxMjguNGMtMS4zIDEuMy02LjQgMi42LTEwLjMgMi42QzExMy43IDYzMyAxMDkuOCA2MzEuNyAxMDguNSA2MzAuNHoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTA3LjIgNjI5LjFjLTEuMy0xMzYuMS0xLjMtMjczLjUtMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNCA0Ni4yIDQ0LjkgOTMuNyA4OS45IDEzOS45IDEzNC44di00Ny41YzAtMi42IDAtMTQuMSA3LjctMjQuNCA2LjQtNy43IDE0LjEtMTAuMyAxOC0xMS42IDE0LjEtNS4xIDI3IDAgMzAuOCAyLjYgNS4xIDIuNiAxMS42IDUuMSAxNi43IDExLjYgMCAwIDYuNCA2LjQgNi40IDE1LjQgMCAxMzYuMSAwIDI3MC45IDAgNDA3SDMzNC41bC0yMDggMTI4LjRjLTEuMyAxLjMtNi40IDIuNi0xMC4zIDIuNlMxMDguNSA2MzAuNCAxMDcuMiA2MjkuMXoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTA0LjcgNjI5LjFjLTEuMy0xMzcuNC0xLjMtMjc0LjctMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNCA0Ni4yIDQ0LjkgOTMuNyA4OS45IDEzOS45IDEzNC44di00Ny41YzAtMi42IDAtMTQuMSA3LjctMjQuNCA2LjQtNy43IDE0LjEtMTAuMyAxOC0xMS42IDE0LjEtNS4xIDI3IDAgMzAuOCAyLjYgMy45IDEuMyAxMC4zIDUuMSAxNS40IDExLjYgMCAwIDYuNCA2LjQgNi40IDE1LjQgMCAxMzYuMSAwIDI3MC45IDAgNDA3SDMzMS45bC0yMDggMTI4LjRjLTEuMyAxLjMtNi40IDIuNi0xMC4zIDIuNkMxMDkuOCA2MzEuNyAxMDYgNjMwLjQgMTA0LjcgNjI5LjF6Ii8+PGcgY2xhc3M9InN0NCI+PHBhdGggY2xhc3M9InN0NSIgZD0iTTQ2MC41IDM2Mi41YzEuMiAyIDAuNiAzLjgtMS44IDUuMyAtOC4xIDQuOS0yMC44IDEwLjMtMzguMyAxNi4xIC0zOC44IDEzLTc0LjYgMTguNC0xMDcuNiAxNi4xIC0yMS0xLjUtNDUuNi02LjQtNzMuNi0xNC42IC0xNS44LTQuNi0yOS44LTkuOS00Mi0xNS45IC0zLjQtMS43LTUuNC0zLTYtMy45IC0xLTEuNi0wLjYtMi45IDEtMy45IDAuOS0wLjUgMi0wLjYgMy40LTAuMiAwLjYgMC4yIDYgMS45IDE2IDUuNCAyNi42IDguNCA1NCAxMy44IDgyLjQgMTYuMiAzMS41IDIuOCA2NC42IDEuMSA5OS40LTUuMSAyMy40LTQuNCA0NC05LjkgNjEuNy0xNi41QzQ1Ny43IDM2MC42IDQ1OS41IDM2MC45IDQ2MC41IDM2Mi41eiIvPjwvZz48ZyBjbGFzcz0ic3Q0Ij48cGF0aCBjbGFzcz0ic3Q2IiBkPSJNNDU5LjUgMzYwLjZjMS4yIDIgMC42IDMuOC0xLjggNS4zIC04LjEgNC45LTIwLjggMTAuMy0zOC4zIDE2LjEgLTM4LjggMTMtNzQuNiAxOC40LTEwNy42IDE2LjEgLTIxLTEuNS00NS42LTYuNC03My42LTE0LjYgLTE1LjgtNC42LTI5LjgtOS45LTQyLTE1LjkgLTMuNC0xLjctNS40LTMtNi0zLjkgLTEtMS42LTAuNi0yLjkgMS0zLjkgMC45LTAuNSAyLTAuNiAzLjQtMC4yIDAuNiAwLjIgNiAxLjkgMTYgNS40IDI2LjYgOC40IDU0IDEzLjggODIuNCAxNi4yIDMxLjUgMi44IDY0LjYgMS4xIDk5LjQtNS4xIDIzLjQtNC40IDQ0LTkuOSA2MS43LTE2LjVDNDU2LjggMzU4LjYgNDU4LjUgMzU5IDQ1OS41IDM2MC42eiIvPjwvZz48L3N2Zz4="
                 style="width: 32px;" alt="ETIENNE SERVICES">
            <b>{{ doc.type_document | default("") | upper }} N° </b>
            {{ doc.date | default("1970-01-01 00:00:00")| date("Y") }}-{{ doc.id | default("")}}
        </span>
        <span>{{ doc.noms_devis | default("")}} {{ doc.prenoms_devis | default("")}}</span>
    </div>
    <div class="adresses full">
        <div class="row__invoice preview space-between full">
            <div class="column__invoice company-devis-details">
                <div class="row__invoice siege justify-center">
                    <div class="column__invoice">
                        <span><b>ETIENNE SERVICES</b></span>
                        <span>6 Passage des groux</span>
                        <span>93130 Noisy-le-Sec</span>
                        <span>Tél: 01 88 33 28 00</span>
                        <span>Mail: contact@etienne-services.fr</span>
                    </div>
                </div>
                <div class="row__invoice">
                    <div class="column__invoice details">
                        <div>
                            <span><b>TYPE</b></span>
                            <span><b>{{ doc.type_document | upper }}</b></span>
                        </div>
                        <div>
                            <span><b>CRÉE LE</b></span>
                            <span>{{ doc.date_devis | date('d/m/Y') }}

                        </div>
                        <div>
                            <span><b>CARACTÈRE</b></span>
                            <span><b class="red">URGENT</b></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column__invoice client justify-center right">
                <div class="column__invoice adresse-facturation justify-center right">
                    <span><b>Adresse d'intervention</b></span>
                    <span>{{ doc.noms_inter }} {{ doc.prenoms_inter }}</span>
                    <span>{{ doc.adresse_inter }}</span>
                    <span>{{ doc.adresse_complement1_inter }}</span>
                    <span>{{ doc.adresse_complement2_inter }}</span>
                    <span>{{ doc.adresse_complement3_inter }}</span>
                    <span>{{ doc.codepostal_inter }} {{ doc.ville_inter }}</span>
                </div>
                <div class="column__invoice adresse-intervention justify-center right">
                    <span><b>Adresse de facturation</b></span>
                    <span>{{ doc.noms_devis }} {{ doc.prenoms_devis }}</span>
                    <span>{{ doc.adresse_devis }}</span>
                    <span>{{ doc.adresse_complement1_devis }}</span>
                    <span>{{ doc.adresse_complement2_devis }}</span>
                    <span>{{ doc.adresse_complement3_devis }}</span>
                    <span>{{ doc.codepostal_devis }} {{ doc.ville_devis }}</span>
                </div>
            </div>
        </div>
    </div>
</header>
{% endblock %}`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\preview\\header.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['headercontent', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<header class="column__invoice invoice-header m10p">
    <div class="row__invoice full-header full align-items-center">
        <span class="row__invoice align-items-center">
            <img
                 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPiAgDQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojNTg3MjdGO30NCgkuc3Qye2ZpbGw6IzQ4OTVCQzt9DQoJLnN0M3tmaWxsOiM1MkE5REQ7fQ0KCS5zdDR7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQoJLnN0NXtmaWxsOiM4ODhFOEU7fQ0KCS5zdDZ7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+PHJlY3QgY2xhc3M9InN0MCIgd2lkdGg9IjY0MCIgaGVpZ2h0PSI2NDAiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTA4LjUgNjMwLjRjLTEuMy0xMzcuNC0xLjMtMjczLjUtMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNEMzOTEgNTkuMSA0MzguNSAxMDQuMSA0ODQuNyAxNDl2LTQ3LjVjMC0yLjYgMC0xNC4xIDcuNy0yNC40IDYuNC03LjcgMTQuMS0xMC4zIDE4LTExLjYgMTQuMS01LjEgMjcgMCAzMC44IDIuNiAzLjkgMS4zIDEwLjMgNS4xIDE1LjQgMTEuNiAwIDAgNi40IDYuNCA2LjQgMTUuNCAwIDEzNi4xIDAgMjcwLjkgMCA0MDdIMzM1LjhsLTIwOCAxMjguNGMtMS4zIDEuMy02LjQgMi42LTEwLjMgMi42QzExMy43IDYzMyAxMDkuOCA2MzEuNyAxMDguNSA2MzAuNHoiLz48cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTA3LjIgNjI5LjFjLTEuMy0xMzYuMS0xLjMtMjczLjUtMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNCA0Ni4yIDQ0LjkgOTMuNyA4OS45IDEzOS45IDEzNC44di00Ny41YzAtMi42IDAtMTQuMSA3LjctMjQuNCA2LjQtNy43IDE0LjEtMTAuMyAxOC0xMS42IDE0LjEtNS4xIDI3IDAgMzAuOCAyLjYgNS4xIDIuNiAxMS42IDUuMSAxNi43IDExLjYgMCAwIDYuNCA2LjQgNi40IDE1LjQgMCAxMzYuMSAwIDI3MC45IDAgNDA3SDMzNC41bC0yMDggMTI4LjRjLTEuMyAxLjMtNi40IDIuNi0xMC4zIDIuNlMxMDguNSA2MzAuNCAxMDcuMiA2MjkuMXoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTA0LjcgNjI5LjFjLTEuMy0xMzcuNC0xLjMtMjc0LjctMi42LTQxMC44IDcwLjYtNjggMTQxLjItMTM3LjQgMjEzLjEtMjA1LjQgMC0xLjMgNS4xLTYuNCAxMi44LTYuNCA3LjcgMCAxMi44IDYuNCAxMi44IDYuNCA0Ni4yIDQ0LjkgOTMuNyA4OS45IDEzOS45IDEzNC44di00Ny41YzAtMi42IDAtMTQuMSA3LjctMjQuNCA2LjQtNy43IDE0LjEtMTAuMyAxOC0xMS42IDE0LjEtNS4xIDI3IDAgMzAuOCAyLjYgMy45IDEuMyAxMC4zIDUuMSAxNS40IDExLjYgMCAwIDYuNCA2LjQgNi40IDE1LjQgMCAxMzYuMSAwIDI3MC45IDAgNDA3SDMzMS45bC0yMDggMTI4LjRjLTEuMyAxLjMtNi40IDIuNi0xMC4zIDIuNkMxMDkuOCA2MzEuNyAxMDYgNjMwLjQgMTA0LjcgNjI5LjF6Ii8+PGcgY2xhc3M9InN0NCI+PHBhdGggY2xhc3M9InN0NSIgZD0iTTQ2MC41IDM2Mi41YzEuMiAyIDAuNiAzLjgtMS44IDUuMyAtOC4xIDQuOS0yMC44IDEwLjMtMzguMyAxNi4xIC0zOC44IDEzLTc0LjYgMTguNC0xMDcuNiAxNi4xIC0yMS0xLjUtNDUuNi02LjQtNzMuNi0xNC42IC0xNS44LTQuNi0yOS44LTkuOS00Mi0xNS45IC0zLjQtMS43LTUuNC0zLTYtMy45IC0xLTEuNi0wLjYtMi45IDEtMy45IDAuOS0wLjUgMi0wLjYgMy40LTAuMiAwLjYgMC4yIDYgMS45IDE2IDUuNCAyNi42IDguNCA1NCAxMy44IDgyLjQgMTYuMiAzMS41IDIuOCA2NC42IDEuMSA5OS40LTUuMSAyMy40LTQuNCA0NC05LjkgNjEuNy0xNi41QzQ1Ny43IDM2MC42IDQ1OS41IDM2MC45IDQ2MC41IDM2Mi41eiIvPjwvZz48ZyBjbGFzcz0ic3Q0Ij48cGF0aCBjbGFzcz0ic3Q2IiBkPSJNNDU5LjUgMzYwLjZjMS4yIDIgMC42IDMuOC0xLjggNS4zIC04LjEgNC45LTIwLjggMTAuMy0zOC4zIDE2LjEgLTM4LjggMTMtNzQuNiAxOC40LTEwNy42IDE2LjEgLTIxLTEuNS00NS42LTYuNC03My42LTE0LjYgLTE1LjgtNC42LTI5LjgtOS45LTQyLTE1LjkgLTMuNC0xLjctNS40LTMtNi0zLjkgLTEtMS42LTAuNi0yLjkgMS0zLjkgMC45LTAuNSAyLTAuNiAzLjQtMC4yIDAuNiAwLjIgNiAxLjkgMTYgNS40IDI2LjYgOC40IDU0IDEzLjggODIuNCAxNi4yIDMxLjUgMi44IDY0LjYgMS4xIDk5LjQtNS4xIDIzLjQtNC40IDQ0LTkuOSA2MS43LTE2LjVDNDU2LjggMzU4LjYgNDU4LjUgMzU5IDQ1OS41IDM2MC42eiIvPjwvZz48L3N2Zz4="
                 style="width: 32px;" alt="ETIENNE SERVICES">
            <b>`);
                        outputBuffer.echo(await this.environment.getFilter('upper').traceableCallable(8, this.source)(...[((await this.traceableMethod(this.getAttribute, 8, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `type_document`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(8, this.source)(...[await this.traceableMethod(this.getAttribute, 8, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `type_document`, new Map([]), `any`, false, false, false), ``])) : (``))]));
                        outputBuffer.echo(` N° </b>
            `);
                        outputBuffer.echo(await this.environment.getFilter('date').traceableCallable(9, this.source)(...[this, ((await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `date`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(9, this.source)(...[await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `date`, new Map([]), `any`, false, false, false), `1970-01-01 00:00:00`])) : (`1970-01-01 00:00:00`)), `Y`]));
                        outputBuffer.echo(`-`);
                        outputBuffer.echo(((await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `id`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(9, this.source)(...[await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `id`, new Map([]), `any`, false, false, false), ``])) : (``)));
                        outputBuffer.echo(`
        </span>
        <span>`);
                        outputBuffer.echo(((await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `noms_devis`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(11, this.source)(...[await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `noms_devis`, new Map([]), `any`, false, false, false), ``])) : (``)));
                        outputBuffer.echo(` `);
                        outputBuffer.echo(((await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `prenoms_devis`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(11, this.source)(...[await this.traceableMethod(this.getAttribute, 11, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `prenoms_devis`, new Map([]), `any`, false, false, false), ``])) : (``)));
                        outputBuffer.echo(`</span>
    </div>
    <div class="adresses full">
        <div class="row__invoice preview space-between full">
            <div class="column__invoice company-devis-details">
                <div class="row__invoice siege justify-center">
                    <div class="column__invoice">
                        <span><b>ETIENNE SERVICES</b></span>
                        <span>6 Passage des groux</span>
                        <span>93130 Noisy-le-Sec</span>
                        <span>Tél: 01 88 33 28 00</span>
                        <span>Mail: contact@etienne-services.fr</span>
                    </div>
                </div>
                <div class="row__invoice">
                    <div class="column__invoice details">
                        <div>
                            <span><b>TYPE</b></span>
                            <span><b>`);
                        outputBuffer.echo(await this.environment.getFilter('upper').traceableCallable(29, this.source)(...[await this.traceableMethod(this.getAttribute, 29, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `type_document`, new Map([]), `any`, false, false, false)]));
                        outputBuffer.echo(`</b></span>
                        </div>
                        <div>
                            <span><b>CRÉE LE</b></span>
                            <span>`);
                        outputBuffer.echo(await this.environment.getFilter('date').traceableCallable(33, this.source)(...[this, await this.traceableMethod(this.getAttribute, 33, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `date_devis`, new Map([]), `any`, false, false, false), `d/m/Y`]));
                        outputBuffer.echo(`

                        </div>
                        <div>
                            <span><b>CARACTÈRE</b></span>
                            <span><b class="red">URGENT</b></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column__invoice client justify-center right">
                <div class="column__invoice adresse-facturation justify-center right">
                    <span><b>Adresse d'intervention</b></span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 46, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `noms_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(` `);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 46, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `prenoms_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 47, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 48, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement1_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 49, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement2_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 50, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement3_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 51, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `codepostal_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(` `);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 51, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `ville_inter`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                </div>
                <div class="column__invoice adresse-intervention justify-center right">
                    <span><b>Adresse de facturation</b></span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 55, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `noms_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(` `);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 55, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `prenoms_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 56, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 57, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement1_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 58, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement2_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 59, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `adresse_complement3_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                    <span>`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 60, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `codepostal_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(` `);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 60, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `ville_devis`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`</span>
                </div>
            </div>
        </div>
    </div>
</header>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('headercontent', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};