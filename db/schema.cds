namespace NFA_01;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal,
    
}
from '@sap/cds/common';

entity Source_Events
{
    key event_id : String;
    Srcevtname : String;
    Createdby : String(50);
    Desc : String(100);
    Version : String(10);
    status : String(100);
    criticality : Integer;
    questionaire : Association to many Questionaire on questionaire.source_Events = $self;
    details : Association to many Details on details.source_Event = $self;
    fieldToggle : Boolean;
}

entity Details
{
    event_id : String;
    Itemname : String(100);
    Description : String(100);
    Quantity : String;
    Unit : String(100);
    Guruprasad : Decimal(8,2);
    Supplier_Demo2 : Decimal(8,2);
    source_Event : Association to one Source_Events on source_Event.event_id = event_id;
}

entity Questionaire
{
    event_id : String;
    question : String(100);
    Guruprasad : String(100);
    Supplier_Demo2 : String(100);
    source_Events : Association to one Source_Events on source_Events.event_id = event_id;
}

entity Files: cuid{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
}