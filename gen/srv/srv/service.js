const cds = require('@sap/cds');
const PDF = require('pdfkit');
const blobStream = require('blob-stream');
module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        Source_Events,
        Questionaire,
        Details
    } = this.entities;

    const c4re = await cds.connect.to('iflow');
    var firstRead = true;

    const event_ids = [];
    /*** SERVICE HANDLERS ***/
    this.before('READ', Source_Events, async (req) => {
        try {
            if (firstRead) {debugger
                const resp = await c4re.get('/dev/GetSourceEvents');
                await cds.tx(req).run(DELETE(Source_Events));
                const spaces = resp?.data;
                const entries = [];
                spaces.forEach(space => {
                    let criticality

                    if (space.Srcevtname) {
                        criticality = 5
                    }

                    if (space.status === 'Completed') {
                        criticality = 3
                    }
                    else if (space.status === 'Pending Selection' || space.status === 'Paused') {
                        criticality = 2
                    }
                    else {
                        criticality = 1
                    }
                    entries.push({
                        status: space.status,
                        Version: space.Version,
                        Srcevtname: space.Srcevtname,
                        Createdby: space.Createdby,
                        Desc: space.Desc,
                        event_id: space.event_id,
                        criticality: criticality,
                        fieldToggle: false
                    });

                    event_ids.push(space.event_id);

                });
                await cds.tx(req).run(INSERT.into(Source_Events).entries(entries));
                firstRead = false;
            } // else {
            //  event_id = req._params[0].event_id
            //  }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });

    // QUESTIONNAIRE

    // this.before('READ', Questionaire, async (req) => {
    //     try {
    //         // if (firstRead) {
    //         const entries = [];
    //         // event_ids.forEach(async eventid => {
    //         const event_id = req._params[0].event_id
    //         let query = '/dev/GetSupplierBidsv1?event_id=' + event_id.toString();
    //         const resp = await c4re.get(query);
    //         await cds.tx(req).run(DELETE(Questionaire));
    //         const spaces = resp?.qns?.qns_data;

    //         if (spaces == undefined) {
    //         } else {
    //             spaces.forEach(space => {

    //                 entries.push({
    //                     event_id: event_id.toString(),
    //                     question: space.question,
    //                     Guruprasad: space.Guruprasad,
    //                     Supplier_Demo2: space.Supplier_Demo2
    //                 });
    //             });
    //             await cds.tx(req).run(INSERT.into(Questionaire).entries(entries));
    //         }

    //         // });


    //         // firstRead = false;
    //         // }
    //         // req.query.SELECT.from.ref[0].id = 'NFA_01Service.Questionaire'
    //         // req.query.SELECT.from.ref[1] = ''
    //         return req;
    //     } catch (err) {
    //         req.error(500, err.message);
    //     }
    // });


    // Details


    // this.before('READ', Details, async (req) => {
    //     try {
    //         const entries = [];
    //         const event_id = req.params[0].event_id
    //         // if (firstRead) {
    //         let query = '/dev/GetSupplierBidsv1?event_id=' + event_id.toString();
    //         const resp = await c4re.get(query);
    //         cds.tx(req).run(DELETE(Details));
    //         const spaces = resp?.data?.items?.bidding_data;
            

    //         if (spaces == undefined) {
    //         } else {
    //             spaces.forEach(space => {
    //                 entries.push({
    //                     event_id: event_id,
    //                     Description: space.Description,
    //                     Guruprasad: space.Guruprasad,
    //                     Supplier_Demo2: space.Supplier_Demo2,
    //                     Itemname: space.Itemname,
    //                     Quantity: space.Quantity.toString(),
    //                     Unit: space.Unit
    //                 });

    //             });
    //             await cds.tx(req).run(INSERT.into(Details).entries(entries));
    //             // firstRead = false;
    //             // }
    //             // return req;

    //         }
    //         return req;

    //     } catch (err)
    //     {
    //         req.error(500, err.message);
    //     }
    // });

    this.on('readSrcEvents',async function(req){
        const { event_id } = req.data;
        // const srcEvents = await SELECT `*`.from (Source_Events) .where `event_id = ${event_id}`;
        const resp = await c4re.get('/dev/GetSourceEvents');
                await cds.tx(req).run(DELETE(Source_Events));
                const spaces = resp?.data;
                const entries = [];
                spaces.forEach(space => {
                    let criticality

                    if (space.Srcevtname) {
                        criticality = 5
                    }

                    if (space.status === 'Completed') {
                        criticality = 3
                    }
                    else if (space.status === 'Pending Selection' || space.status === 'Paused') {
                        criticality = 2
                    }
                    else {
                        criticality = 1
                    }
                    entries.push({
                        status: space.status,
                        Version: space.Version,
                        Srcevtname: space.Srcevtname,
                        Createdby: space.Createdby,
                        Desc: space.Desc,
                        event_id: space.event_id,
                        criticality: criticality,
                        fieldToggle: false
                    });
                });
        let entry
        entries.forEach((entr => {
            if (entr.event_id = event_id){
                entry = entr;
            }
        }))
        return entry;
    });

    this.on('generatePdf',async function(req){
        const doc = new PDF;
        const stream = doc.pipe(blobStream());
        doc.end();

        // stream.on('finish', function(){
            const blob = stream.toBlob('application/pdf');
            const usableurl = URL.createObjectURL(blob);
            const url = stream.toBlobURL('application/pdf');
            
            return url;

            // blob:nodedata:188bc6e0-1f5f-4571-b02b-32282ec8b4e6
        // })
    });

});


