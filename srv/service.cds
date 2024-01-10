using { NFA_01 as my } from '../db/schema';

@path : '/service/NFA_01'
service NFA_01Service
{

    @readonly
    entity Source_Events as projection on my.Source_Events;
 
    @readonly
    entity Questionaire as
        projection on my.Questionaire;

    // @readonly
    @odata.draft.enabled
    entity Details as
        projection on my.Details;

    entity Files as projection on my.Files;


    function readSrcEvents(event_id : String) returns {};
    function generatePdf() returns String;

}
