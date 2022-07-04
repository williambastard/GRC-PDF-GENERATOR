import fs from 'fs';
import path from 'path';
import text2png from 'text2png';
import PDF from '../../pdf/models/pdf.models';
import Synchroteam from '../models/pdfgenerator.models';
import { Request, Response } from 'express';

const generateTVA = async (req: Request, res: Response) => {
  const synchroteam = new Synchroteam(req.session);

  const pageID = req.body.pageID ?? req.params.pageID ?? 1;
  let json = await synchroteam.generateTVA('GET', `https://ws.synchroteam.com/api/v3/job/list?pageSize=100&page=${pageID}`, 'JSON');
  json = JSON.parse(json?.data);
  let signImg;
  json?.data?.forEach(async (elem, index) => {
    if (elem.status == 'validated' || elem.status == 'completed') {
      let signatureT = text2png(elem.customer.name.toString(), {
        color: 'black',
        font: '72pt Cherolina',
        localFontPath: path.join(process.cwd(), `public/views/fonts/cherolina/Cherolina.ttf`),
        localFontName: 'Cherolina',
        padding: 5,
        output: 'dataURL',
      });
      /*
            let photo = await synchroteam.generateTVA("GET", `https://ws.synchroteam.com/api/v3/job/photos?id=${elem.id}`, 'JSON');
            console.log(CircularJSON.stringify(photo.data))
            signImg = signatureT ?? signature;

            if (photo && photo.data && photo.data.jobPhoto && photo?.data?.jobPhoto[2]) {
                const img = await synchroteam.generateTVA("GET", `${photo?.data?.jobPhoto[2]?.url}`,'BLOB');
                signImg = img.data;
            }
*/
      const type = elem.type.name;
      const inter = `Inter n° ${elem.num} ${elem.customer.name}`;
      const obj = [
        {
          noms: elem.customer.name.split(' ')[1] ?? ' ',
          prenoms: elem.customer.name.split(' ')[0] ?? '  ',
          adresse: elem.addressStreet,
          cp: elem.addressZIP,
          ville: elem.addressCity,
          date: new Date(elem.scheduledStart).toLocaleDateString('fr-FR'),
          maison_local: true,
          immeuble_local: false,
          appartement_local: false,
          autre_local: false,
          autre_local_precision: '    ',
          local_habitation: true,
          local_50p_habitation: false,
          local_xp_habitation: false,
          local_xp_chiffre: ' ',
          local_non_habita: false,
          case_proprio: false,
          case_locataire: true,
          case_autre: false,
          autre_type: '   ',
          case_fondation: true,
          etat_neuf: false,
          affet_ele: true,
          etat_neuf2: false,
          facade: true,
          etat_neuf3: false,
          nonneuf: true,
          non_plancher: true,
          neuf_2sur3_plancher: false,
          neuf_2sur3Plus_plancher: false,
          nonhuisseries_ext: type.match(/SERRURERIE/) ? false : true,
          neuf_2sur3_huisseries_ext: type.match(/SERRURERIE/) ? true : false,
          neuf_2sur3Plus_huisseries: false,
          noncloisons: true,
          neuf_2sur3_cloisons: false,
          neuf_2sur3Plus_cloisons: false,
          nonplomberie: type.match(/PLOMBERIE/) ? false : true,
          neuf_2sur3_plomberie: type.match(/PLOMBERIE/) ? true : false,
          neuf_2sur3Plus_plomberie: false,
          nonelec: type.match(/ELECTRICITE/) ? false : true,
          neuf_2sur3_elec: type.match(/ELECTRICITE/) ? true : false,
          neuf_2sur3Plus_elec: false,
          nonchauffage: type.match(/CHAUFFAGE/) ? false : true,
          neuf_2sur3_chauffage: type.match(/CHAUFFAGE/) ? true : false,
          neuf_2sur3Plus_chauffage: false,
          attest_period2ans: true,
          attest_travsurelev: true,
          attest_travqualiteener: false,
          attest_tvareduite: false,
          signature_af_image: signImg,
          interno: inter,
        },
      ];

      /* generation du PDF */
      const pdf = new PDF('pdf', '1300-sd_1527');
      const bytes = await pdf.createTVA(obj, signImg ?? signImg);
      //const circ = CircularJSON.stringify(req);

      if (bytes.status === 200) {
        fs.writeFileSync(`./generated/ATTESTATION-TVA_${elem.customer.name.replace(/[\W]+/g, '')}_${elem.num}.pdf`, bytes.data);
        //return res.status(bytes.status).type("application/pdf").send(bytes.doc);
      }
      //else
      //return res.status(bytes.status).type(bytes.mime).json(bytes);
    }
  });

  return res.status(200).json(json.data);
};
export { generateTVA };
