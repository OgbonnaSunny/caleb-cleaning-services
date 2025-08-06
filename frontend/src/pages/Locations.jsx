import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Domestic from "../images/domestic.png";
import Upholstery from "../images/upholstery2.png";
import Regular from "../images/regular.png";
import Commercial from "../images/commercial.png";
import EndOfTenancy from "../images/endOfTenancy.png";
import LivingRoom from "../images/livingRoom.png";
import Deep from "../images/deep.png";
import WindowCleaner from "../images/regular.png";
import Office from "../images/office.png";
import Day from "../images/day.png";
import Move from "../images/move.png";
import Rug from "../images/rug.png";
import Mattress from "../images/mattress.png";
import Bathroom from "../images/bathroom.png";
import Spring from "../images/spring.png";
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import Footer from '../pages/Footer.jsx'
import { isValidUKPostcodeFormat, checkPostcodeExists } from './Postcode.jsx'

const Locations = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const miniLocations = [
    { id: 1, name: "Abbey" },
    { id: 2, name: "Abbey Road" },
    { id: 3, name: "Abbey Wood" },
    { id: 4, name: "Abingdon" },
    { id: 5, name: "Acton Central" },
  ]
  const miniLocations2 = [
    {
      id: 1,
      postcode: "EH1",
      name: "Edinburgh City Centre",
      addresses: [
        "1 Princes Street, Edinburgh, EH1 2EQ",
        "The Balmoral Hotel, 1 Princes Street, Edinburgh, EH1 2EQ",
        "Edinburgh Waverley Station, Edinburgh, EH1 1BQ"
      ]
    },
    {
      id: 2,
      postcode: "EH2",
      name: "New Town / City Centre",
      addresses: [
        "The Scotch Whisky Experience, 354 Castlehill, Edinburgh, EH2 4AE",
        "Assembly Rooms, 54 George Street, Edinburgh, EH2 2LR",
        "Harvey Nichols, 30-34 St Andrew Square, Edinburgh, EH2 2AD"
      ]
    },
    {
      id: 3,
      postcode: "EH3",
      name: "West End / Bruntsfield",
      addresses: [
        "The Royal College of Physicians, 9 Queen Street, Edinburgh, EH2 1JQ",
        "The Dome, 14 George Street, Edinburgh, EH2 2PF",
        "Tynecastle Park (Hearts FC), Gorgie Road, Edinburgh, EH11 2NL"
      ]
    },
    {
      id: 4,
      postcode: "EH4",
      name: "West Edinburgh (Murrayfield, Cramond, Davidson Mains)",
      addresses: [
        "Murrayfield Stadium, Roseburn Street, Edinburgh, EH12 5PJ",
        "Cramond Kirk, Cramond Glebe Road, Edinburgh, EH4 6NS",
        "Davidson Mains Park, 5 Quality Street, Edinburgh, EH4 5BP"
      ]
    },
    {
      id: 5,
      postcode: "EH5",
      name: "Trinity, Granton, Newhaven",
      addresses: [
        "Ocean Terminal, Ocean Drive, Edinburgh, EH6 6JJ",
        "Newhaven Harbour, 24 Pier Place, Edinburgh, EH6 4LP",
        "The Trinity Academy, Craighall Road, Edinburgh, EH6 4RT"
      ]
    },
  ]

  const allLocations = [
    { id: 1, name: "Abbey" },
    { id: 2, name: "Abbey Road" },
    { id: 3, name: "Abbey Wood" },
    { id: 4, name: "Abingdon" },
    { id: 5, name: "Acton Central" },
    { id: 6, name: "Addiscombe East" },
    { id: 7, name: "Addiscombe West" },
    { id: 8, name: "Addison" },
    { id: 9, name: "Aldborough" },
    { id: 10, name: "Alexandra" },
    { id: 11, name: "Alibon" },
    { id: 12, name: "Alperton" },
    { id: 13, name: "Angel" },
    { id: 14, name: "Askew" },
    { id: 15, name: "Avonmore & Brook Green" },
    { id: 252, name: "Grove Green" },
    { id: 253, name: "Grove Park" },
    { id: 254, name: "Hackney" },
    { id: 255, name: "Hackney Central" },
    { id: 256, name: "Hackney Downs" },
    { id: 257, name: "Hackney Wick" },

    // New items (16-75)
    { id: 16, name: "Balham" },
    { id: 17, name: "Barking" },
    { id: 18, name: "Barkingside" },
    { id: 19, name: "Barnehurst" },
    { id: 20, name: "Barnes" },
    { id: 21, name: "Barnet" },
    { id: 22, name: "Barnhill" },
    { id: 23, name: "Barnsbury" },
    { id: 24, name: "Battersea" },
    { id: 25, name: "Bayswater" },
    { id: 26, name: "Beckenham" },
    { id: 27, name: "Beckton" },
    { id: 28, name: "Becontree" },
    { id: 29, name: "Beddington North" },
    { id: 30, name: "Beddington South" },
    { id: 31, name: "Bedfont" },
    { id: 32, name: "Bedford" },
    { id: 33, name: "Bellingham" },
    { id: 34, name: "Belmont" },
    { id: 35, name: "Belsize" },
    { id: 36, name: "Belvedere" },
    { id: 37, name: "Bensham Manor" },
    { id: 38, name: "Berrylands" },
    { id: 39, name: "Bethnal Green" },
    { id: 40, name: "Beverley" },
    { id: 41, name: "Bexley" },
    { id: 42, name: "Bexleyheath" },
    { id: 43, name: "Bickley" },
    { id: 44, name: "Biggin Hill" },
    { id: 45, name: "Bishop's" },
    { id: 46, name: "Blackfen & Lamorbey" },
    { id: 47, name: "Blackheath" },
    { id: 48, name: "Blackheath Westcombe" },
    { id: 49, name: "Blackwall & Cubitt Town" },
    { id: 50, name: "Blendon & Penhill" },
    { id: 51, name: "Bloomsbury" },
    { id: 52, name: "Boleyn" },
    { id: 53, name: "Borehamwood" },
    { id: 54, name: "Borough & Bankside" },
    { id: 55, name: "Botwell" },
    { id: 56, name: "Bounds Green" },
    { id: 57, name: "Bow East" },
    { id: 58, name: "Bow West" },
    { id: 59, name: "Bowes" },
    { id: 60, name: "Brent" },
    { id: 61, name: "Brentford" },
    { id: 62, name: "Bridge" },
    { id: 63, name: "Brixton" },
    { id: 64, name: "Brixton Hill" },
    { id: 65, name: "Broad Green" },
    { id: 66, name: "Brockley" },
    { id: 67, name: "Bromley" },
    { id: 68, name: "Bromley Common & Keston" },
    { id: 69, name: "Bromley North" },
    { id: 70, name: "Bromley South" },
    { id: 71, name: "Bromley Town" },
    { id: 72, name: "Brompton & Hans Town" },
    { id: 73, name: "Brondesbury Park" },
    { id: 74, name: "Brooklands" },
    { id: 75, name: "Brownswood" },
    { id: 76, name: "Bruce Grove" },
    { id: 77, name: "Brunel" },
    { id: 78, name: "Brunswick Park" },
    { id: 79, name: "Bryanston & Dorset Square" },
    { id: 80, name: "Bunhill" },
    { id: 81, name: "Burnt Oak" },
    { id: 82, name: "Bush Hill Park" },
    { id: 83, name: "Caledonian" },
    { id: 84, name: "Camberwell Green" },
    { id: 85, name: "Camden" },
    { id: 86, name: "Camden Town with Primrose Hill" },
    { id: 87, name: "Campden" },
    { id: 88, name: "Canary Wharf" },
    { id: 89, name: "Canbury" },
    { id: 90, name: "Cann Hall" },
    { id: 91, name: "Canning Town North" },
    { id: 92, name: "Canning Town South" },
    { id: 93, name: "Cannon Hill" },
    { id: 94, name: "Canonbury" },
    { id: 95, name: "Canons" },
    { id: 96, name: "Cantelowes" },
    { id: 97, name: "Carshalton Central" },
    { id: 98, name: "Carshalton South and Clockhouse" },
    { id: 99, name: "Catford South" },
    { id: 100, name: "Cathall" },
    { id: 101, name: "Cavendish" },
    { id: 102, name: "Cazenove" },
    { id: 103, name: "Chadwell" },
    { id: 104, name: "Chadwell Heath" },
    { id: 105, name: "Champion Hill" },
    { id: 106, name: "Chapel End" },
    { id: 107, name: "Charlton" },
    { id: 108, name: "Charville" },
    { id: 109, name: "Chase" },
    { id: 110, name: "Chaucer" },
    { id: 111, name: "Cheam" },
    { id: 112, name: "Chelsea Riverside" },
    { id: 113, name: "Chelsfield & Pratts Bottom" },
    { id: 114, name: "Chessington North & Hook" },
    { id: 115, name: "Chessington South" },
    { id: 116, name: "Childs Hill" },
    { id: 117, name: "Chingford Green" },
    { id: 118, name: "Chislehurst" },
    { id: 119, name: "Chiswick" },
    { id: 120, name: "Chiswick Homefields" },
    { id: 121, name: "Chiswick Riverside" },
    { id: 122, name: "Church Street" },
    { id: 123, name: "Churchfields" },
    { id: 124, name: "Churchill" },
    { id: 125, name: "City of Westminster" },
    { id: 126, name: "Clapham" },
    { id: 127, name: "Clapham Common" },
    { id: 128, name: "Clayhall" },
    { id: 129, name: "Clementswood" },
    { id: 130, name: "Clerkenwell" },
    { id: 131, name: "Cleveland" },
    { id: 132, name: "Clissold" },
    { id: 133, name: "Clock House" },
    { id: 134, name: "Cockfosters" },
    { id: 135, name: "Coldharbour" },
    { id: 136, name: "Coldharbour & New Eltham" },
    { id: 137, name: "Colindale" },
    { id: 138, name: "College Park & Old Oak" },
    { id: 139, name: "Colliers Wood" },
    { id: 140, name: "Colville" },
    { id: 141, name: "Coombe Hill" },
    { id: 142, name: "Coombe Vale" },
    { id: 143, name: "Copers Cope" },
    { id: 144, name: "Coppetts" },
    { id: 145, name: "Coulsdon Town" },
    { id: 146, name: "Courtfield" },
    { id: 147, name: "Cranbrook" },
    { id: 148, name: "Cranford" },
    { id: 149, name: "Cranham" },
    { id: 150, name: "Cray Valley East" },
    { id: 151, name: "Cray Valley West" },
    { id: 152, name: "Crayford" },
    { id: 153, name: "Cricket Green" },
    { id: 154, name: "Crofton Park" },
    { id: 155, name: "Crook Log" },
    { id: 156, name: "Crouch End" },
    { id: 157, name: "Croydon" },
    { id: 158, name: "Crystal Palace" },
    { id: 159, name: "Crystal Palace & Upper Norwood" },
    { id: 160, name: "Custom House" },
    { id: 161, name: "Dalgarno" },
    { id: 162, name: "Dalston" },
    { id: 163, name: "Darwin" },
    { id: 164, name: "De Beauvoir" },
    { id: 165, name: "Dollis Hill" },
    { id: 166, name: "Dormers Wells" },
    { id: 167, name: "Downham" },
    { id: 168, name: "Dudden Hill" },
    { id: 169, name: "Dulwich" },
    { id: 170, name: "Dulwich Hill" },
    { id: 171, name: "Dulwich Village" },
    { id: 172, name: "Dulwich Wood" },
    { id: 173, name: "Dundonald" },
    { id: 174, name: "Ealing" },
    { id: 175, name: "Ealing Broadway" },
    { id: 176, name: "Ealing Common" },
    { id: 177, name: "Earl's Court" },
    { id: 178, name: "Earlsfield" },
    { id: 179, name: "East Acton" },
    { id: 180, name: "East Barnet" },
    { id: 181, name: "East Finchley" },
    { id: 182, name: "East Ham Central" },
    { id: 183, name: "East Ham North" },
    { id: 184, name: "East Ham South" },
    { id: 185, name: "East Putney" },
    { id: 186, name: "East Sheen" },
    { id: 187, name: "East Wickham" },
    { id: 188, name: "Eastbrook" },
    { id: 189, name: "Eastbury" },
    { id: 190, name: "Eastcote & East Ruislip" },
    { id: 191, name: "Edgware" },
    { id: 192, name: "Edmonton Green" },
    { id: 193, name: "Elm Park" },
    { id: 194, name: "Eltham North" },
    { id: 195, name: "Eltham South" },
    { id: 196, name: "Eltham West" },
    { id: 197, name: "Elthorne" },
    { id: 198, name: "Emerson Park" },
    { id: 199, name: "Endlebury" },
    { id: 200, name: "Enfield" },
    { id: 201, name: "Enfield Highway" },
    { id: 202, name: "Enfield Lock" },
    { id: 203, name: "Erith" },
    { id: 204, name: "Evelyn" },
    { id: 205, name: "Fairfield" },
    { id: 206, name: "Fairlop" },
    { id: 207, name: "Falconwood & Welling" },
    { id: 208, name: "Faraday" },
    { id: 209, name: "Farnborough & Crofton" },
    { id: 210, name: "Feltham North" },
    { id: 211, name: "Feltham West" },
    { id: 212, name: "Ferndale" },
    { id: 213, name: "Figge's Marsh" },
    { id: 214, name: "Finchley" },
    { id: 215, name: "Finchley Church End" },
    { id: 216, name: "Finsbury Park" },
    { id: 217, name: "Forest" },
    { id: 218, name: "Forest Gate North" },
    { id: 219, name: "Forest Gate South" },
    { id: 220, name: "Forest Hill" },
    { id: 221, name: "Fortis Green" },
    { id: 222, name: "Fortune Green" },
    { id: 223, name: "Frognal & Fitzjohns" },
    { id: 224, name: "Fryent" },
    { id: 225, name: "Fulham" },
    { id: 226, name: "Fulham Broadway" },
    { id: 227, name: "Fulham Reach" },
    { id: 228, name: "Fullwell" },
    { id: 229, name: "Fulwell & Hampton Hill" },
    { id: 230, name: "Furzedown" },
    { id: 231, name: "Garden Suburb" },
    { id: 232, name: "Gascoigne" },
    { id: 233, name: "Gipsy Hill" },
    { id: 234, name: "Glyndon" },
    { id: 235, name: "Golborne" },
    { id: 236, name: "Golders Green" },
    { id: 237, name: "Goodmayes" },
    { id: 238, name: "Goose Green" },
    { id: 239, name: "Gooshays" },
    { id: 240, name: "Goresbrook" },
    { id: 241, name: "Gospel Oak" },
    { id: 242, name: "Grange" },
    { id: 243, name: "Graveney" },
    { id: 244, name: "Green Street East" },
    { id: 245, name: "Green Street West" },
    { id: 246, name: "Greenford Broadway" },
    { id: 247, name: "Greenford Green" },
    { id: 248, name: "Greenhill" },
    { id: 249, name: "Greenwich" },
    { id: 250, name: "Greenwich West" },
    { id: 251, name: "Grove" },
    { id: 252, name: "Grove Green" },
    { id: 253, name: "Grove Park" },
    { id: 254, name: "Hackney" },
    { id: 255, name: "Hackney Central" },
    { id: 256, name: "Hackney Downs" },
    { id: 257, name: "Hackney Wick" },
    { id: 258, name: "Hacton" },
    { id: 259, name: "Haggerston" },
    { id: 260, name: "Hainault" },
    { id: 261, name: "Hale" },
    { id: 262, name: "Hale End & Highams Park" },
    { id: 263, name: "Ham, Petersham & Richmond Riverside" },
    { id: 264, name: "Hammersmith & Fulham" },
    { id: 265, name: "Hammersmith Broadway" },
    { id: 266, name: "Hampstead" },
    { id: 267, name: "Hampton" },
    { id: 268, name: "Hampton North" },
    { id: 269, name: "Hampton Wick" },
    { id: 270, name: "Hanger Hill" },
    { id: 271, name: "Hanworth" },
    { id: 272, name: "Hanworth Park" },
    { id: 273, name: "Harefield" },
    { id: 274, name: "Haringey" },
    { id: 275, name: "Harlesden" },
    { id: 276, name: "Harold Wood" },
    { id: 277, name: "Harringay" },
    { id: 278, name: "Harrow" },
    { id: 279, name: "Harrow on the Hill" },
    { id: 280, name: "Harrow Road" },
    { id: 281, name: "Harrow Weald" },
    { id: 282, name: "Haselbury" },
    { id: 283, name: "Hatch End" },
    { id: 284, name: "Hatch Lane" },
    { id: 285, name: "Havering" },
    { id: 286, name: "Havering Park" },
    { id: 287, name: "Haverstock" },
    { id: 288, name: "Hayes & Coney Hall" },
    { id: 289, name: "Headstone North" },
    { id: 290, name: "Headstone South" },
    { id: 291, name: "Heath" },
    { id: 292, name: "Heathfield" },
    { id: 293, name: "Heathrow Villages" },
    { id: 294, name: "Heaton" },
    { id: 295, name: "Hendon" },
    { id: 296, name: "Herne Hill" },
    { id: 297, name: "Heston Central" },
    { id: 298, name: "Heston East" },
    { id: 299, name: "Heston West" },
    { id: 300, name: "High Barnet" },
    { id: 301, name: "High Street" },
    { id: 302, name: "Higham Hill" },
    { id: 303, name: "Highbury East" },
    { id: 304, name: "Highbury West" },
    { id: 305, name: "Highgate" },
    { id: 306, name: "Highlands" },
    { id: 307, name: "Hillingdon" },
    { id: 308, name: "Hillingdon East" },
    { id: 309, name: "Hillrise" },
    { id: 310, name: "Hillside" },
    { id: 311, name: "Hither Green" },
    { id: 312, name: "Hobbayne" },
    { id: 313, name: "Hoe Street" },
    { id: 314, name: "Holborn & Covent Garden" },
    { id: 315, name: "Holland" },
    { id: 316, name: "Holloway" },
    { id: 317, name: "Homerton" },
    { id: 318, name: "Hornchurch" },
    { id: 319, name: "Hornsey" },
    { id: 320, name: "Hounslow" },
    { id: 321, name: "Hounslow Central" },
    { id: 322, name: "Hounslow Heath" },
    { id: 323, name: "Hounslow South" },
    { id: 324, name: "Hounslow West" },
    { id: 325, name: "Hoxton East & Shoreditch" },
    { id: 326, name: "Hoxton West" },
    { id: 327, name: "Hyde Park" },
    { id: 328, name: "Hylands" },
    { id: 329, name: "Ickenham" },
    { id: 330, name: "Ilford" },
    { id: 331, name: "Island Gardens" },
    { id: 332, name: "Isleworth" },
    { id: 333, name: "Islington" },
    { id: 334, name: "Jubilee" },
    { id: 335, name: "Junction" },
    { id: 336, name: "Kelsey & Eden Park" },
    { id: 337, name: "Kenley" },
    { id: 338, name: "Kensal Green" },
    { id: 339, name: "Kensington & Chelsea" },
    { id: 340, name: "Kentish Town" },
    { id: 341, name: "Kenton" },
    { id: 342, name: "Kenton East" },
    { id: 343, name: "Kenton West" },
    { id: 344, name: "Kew" },
    { id: 345, name: "Kidbrooke with Hornfair" },
    { id: 346, name: "Kilburn" },
    { id: 347, name: "King's Cross" },
    { id: 348, name: "King's Park" },
    { id: 349, name: "Kingston" },
    { id: 350, name: "Knight's Hill" },
    { id: 351, name: "Knightsbridge & Belgravia" },
    { id: 352, name: "Lady Margaret" },
    { id: 353, name: "Ladywell" },
    { id: 354, name: "Lambeth" },
    { id: 355, name: "Lancaster Gate" },
    { id: 356, name: "Lansbury" },
    { id: 357, name: "Larkhall" },
    { id: 358, name: "Larkswood" },
    { id: 359, name: "Latchmere" },
    { id: 360, name: "Lavender Fields" },
    { id: 361, name: "Lea Bridge" },
    { id: 362, name: "Lee Green" },
    { id: 363, name: "Lewisham" },
    { id: 364, name: "Lewisham Central" },
    { id: 365, name: "Leyton" },
    { id: 366, name: "Leytonstone" },
    { id: 367, name: "Limehouse" },
    { id: 368, name: "Little Ilford" },
    { id: 369, name: "Little Venice" },
    { id: 370, name: "London Bridge & West Bermondsey" },
    { id: 371, name: "London Fields" },
    { id: 372, name: "Longbridge" },
    { id: 373, name: "Longlands" },
    { id: 374, name: "Longthornton" },
    { id: 375, name: "Lower Edmonton" },
    { id: 376, name: "Lower Morden" },
    { id: 377, name: "Loxford" },
    { id: 378, name: "Maida Vale" },
    { id: 379, name: "Manor" },
    { id: 380, name: "Manor Park" },
    { id: 381, name: "Mapesbury" },
    { id: 382, name: "Markhouse" },
    { id: 383, name: "Marlborough" },
    { id: 384, name: "Marylebone High Street" },
    { id: 385, name: "Mawneys" },
    { id: 386, name: "Mayesbrook" },
    { id: 387, name: "Mayfield" },
    { id: 388, name: "Merton" },
    { id: 389, name: "Merton Park" },
    { id: 390, name: "Middle Park & Sutcliffe" },
    { id: 391, name: "Mildmay" },
    { id: 392, name: "Mile End" },
    { id: 393, name: "Mill Hill" },
    { id: 394, name: "Monkhams" },
    { id: 395, name: "Mortlake & Barnes Common" },
    { id: 396, name: "Mottingham & Chislehurst North" },
    { id: 397, name: "Munster" },
    { id: 398, name: "Muswell Hill" },
    { id: 399, name: "New Addington North" },
    { id: 400, name: "New Addington South" },
    { id: 401, name: "New Cross" },
    { id: 402, name: "Newbury" },
    { id: 403, name: "Newham" },
    { id: 404, name: "Newington" },
    { id: 405, name: "Nightingale" },
    { id: 406, name: "Noel Park" },
    { id: 407, name: "Nonsuch" },
    { id: 408, name: "Norbiton" },
    { id: 409, name: "Norbury" },
    { id: 410, name: "Norbury & Pollards Hill" },
    { id: 411, name: "Norbury Park" },
    { id: 412, name: "Norland" },
    { id: 413, name: "North Bermondsey" },
    { id: 414, name: "North End" },
    { id: 415, name: "North Greenford" },
    { id: 416, name: "North Richmond" },
    { id: 417, name: "North Walworth" },
    { id: 418, name: "Northcote" },
    { id: 419, name: "Northfield" },
    { id: 420, name: "Northolt" },
    { id: 421, name: "Northolt Mandeville" },
    { id: 422, name: "Northolt West End" },
    { id: 423, name: "Northumberland Heath" },
    { id: 424, name: "Northumberland Park" },
    { id: 425, name: "Northwick Park" },
    { id: 426, name: "Northwood" },
    { id: 427, name: "Northwood Hills" },
    { id: 428, name: "Norwood Green" },
    { id: 429, name: "Notting Dale" },
    { id: 430, name: "Notting Hill" },
    { id: 431, name: "Nunhead & Queen's Road"},
    { id: 432, name: "Oakleigh" },
    { id: 433, name: "Old Coulsdon" },
    { id: 434, name: "Old Kent Road" },
    { id: 435, name: "Old Malden" },
    { id: 436, name: "Orpington" },
    { id: 437, name: "Osterley & Spring Grove" },
    { id: 438, name: "Oval" },
    { id: 439, name: "Palace Riverside" },
    { id: 440, name: "Palmers Green" },
    { id: 441, name: "Park Hill & Whitgift" },
    { id: 442, name: "Parsloes" },
    { id: 443, name: "Parsons Green" },
    { id: 444, name: "Parsons Green & Walham" },
    { id: 445, name: "Peckham" },
    { id: 446, name: "Peckham Rye" },
    { id: 447, name: "Pembridge" },
    { id: 448, name: "Penge & Cator" },
    { id: 449, name: "Peninsula" },
    { id: 450, name: "Perivale" },
    { id: 451, name: "Perry Vale" },
    { id: 452, name: "Pettits" },
    { id: 453, name: "Petts Wood & Knoll" },
    { id: 454, name: "Pinkwell" },
    { id: 455, name: "Pinner" },
    { id: 456, name: "Pinner South" },
    { id: 457, name: "Plaistow & Sundridge" },
    { id: 458, name: "Plaistow North" },
    { id: 459, name: "Plaistow South" },
    { id: 460, name: "Plumstead" },
    { id: 461, name: "Pollards Hill" },
    { id: 462, name: "Ponders End" },
    { id: 463, name: "Poplar" },
    { id: 464, name: "Preston" },
    { id: 465, name: "Prince's" },
    { id: 466, name: "Purley & Woodcote" },
    { id: 467, name: "Purley Oaks & Riddlesdown" },
    { id: 468, name: "Putney" },
    { id: 469, name: "Queen's Gate" },
    { id: 470, name: "Queen's Park" },
    { id: 471, name: "Queens Park" },
    { id: 472, name: "Queensbury" },
    { id: 473, name: "Queenstown" },
    { id: 474, name: "Rainham & Wennington" },
    { id: 475, name: "Ravensbury" },
    { id: 476, name: "Ravenscourt Park" },
    { id: 477, name: "Rayners Lane" },
    { id: 478, name: "Raynes Park" },
    { id: 479, name: "Redbridge" },
    { id: 480, name: "Redcliffe" },
    { id: 481, name: "Regent's Park" },
    { id: 482, name: "Richmond" },
    { id: 483, name: "River" },
    { id: 484, name: "Roehampton & Putney Heath" },
    { id: 485, name: "Romford" },
    { id: 486, name: "Rotherhithe" },
    { id: 487, name: "Roxbourne" },
    { id: 488, name: "Roxeth" },
    { id: 489, name: "Royal Docks" },
    { id: 490, name: "Royal Hospital" },
    { id: 491, name: "Ruislip" },
    { id: 492, name: "Rushey Green" },
    { id: 493, name: "Rye Lane" },
    { id: 494, name: "Sanderstead" },
    { id: 495, name: "Sands End" },
    { id: 496, name: "Selhurst" },
    { id: 497, name: "Selsdon & Addington Village" },
    { id: 498, name: "Selsdon Vale & Forestdale" },
    { id: 499, name: "Seven Kings" },
    { id: 500, name: "Seven Sisters" },
    { id: 501, name: "Shacklewell" },
    { id: 502, name: "Shadwell" },
    { id: 503, name: "Shaftesbury" },
    { id: 504, name: "Shepherd's Bush Green" },
    { id: 505, name: "Shirley North" },
    { id: 506, name: "Shirley South" },
    { id: 507, name: "Shooters Hill" },
    { id: 508, name: "Shortlands" },
    { id: 509, name: "Sidcup" },
    { id: 510, name: "Slade Green & Northend" },
    { id: 511, name: "South Acton" },
    { id: 512, name: "South Bermondsey" },
    { id: 513, name: "South Croydon" },
    { id: 514, name: "South Hornchurch" },
    { id: 515, name: "South Norwood" },
    { id: 516, name: "South Richmond" },
    { id: 517, name: "South Ruislip" },
    { id: 518, name: "South Twickenham" },
    { id: 519, name: "South Woodford" },
    { id: 520, name: "Southall Broadway" },
    { id: 521, name: "Southall Green" },
    { id: 522, name: "Southbury" },
    { id: 523, name: "Southfield" },
    { id: 524, name: "Southfields" },
    { id: 525, name: "Southgate" },
    { id: 526, name: "Southgate Green" },
    { id: 527, name: "Southwark" },
    { id: 528, name: "Spitalfields & Banglatown" },
    { id: 529, name: "Springfield" },
    { id: 530, name: "Squirrel's Heath" },
    { id: 531, name: "St Andrew's" },
    { id: 532, name: "St Ann's" },
    { id: 533, name: "St Dunstan's" },
    { id: 534, name: "St George's" },
    { id: 535, name: "St Giles" },
    { id: 536, name: "St Helier" },
    { id: 537, name: "St James" },
    { id: 538, name: "St James's" },
    { id: 539, name: "St Katharine's & Wapping" },
    { id: 540, name: "St Leonard's" },
    { id: 541, name: "St Margarets & North Twickenham" },
    { id: 542, name: "St Mark's" },
    { id: 543, name: "St Mary's" },
    { id: 544, name: "St Mary's & St James" },
    { id: 545, name: "St Mary's Park" },
    { id: 546, name: "St Pancras & Somers Town" },
    { id: 547, name: "St Peter's" },
    { id: 548, name: "St. Helen's" },
    { id: 549, name: "Stamford Hill West" },
    { id: 550, name: "Stanley" },
    { id: 551, name: "Stanmore Park" },
    { id: 552, name: "Stepney Green" },
    { id: 553, name: "Stockwell" },
    { id: 554, name: "Stoke Newington" },
    { id: 555, name: "Stonebridge" },
    { id: 556, name: "Stonecot" },
    { id: 557, name: "Stratford & New Town" },
    { id: 558, name: "Streatham" },
    { id: 559, name: "Streatham Hill" },
    { id: 560, name: "Streatham South" },
    { id: 561, name: "Streatham Wells" },
    { id: 562, name: "Stroud Green" },
    { id: 563, name: "Sudbury" },
    { id: 564, name: "Surbiton" },
    { id: 565, name: "Surbiton Hill" },
    { id: 566, name: "Surrey Docks" },
    { id: 567, name: "Sutton" },
    { id: 568, name: "Sutton Central" },
    { id: 569, name: "Sutton North" },
    { id: 570, name: "Sutton South" },
    { id: 571, name: "Sutton West" },
    { id: 572, name: "Swiss Cottage" },
    { id: 573, name: "Sydenham" },
    { id: 574, name: "Syon" },
    { id: 575, name: "Tachbrook" },
    { id: 576, name: "Teddington" },
    { id: 577, name: "Telegraph Hill" },
    { id: 578, name: "Thames" },
    { id: 579, name: "Thamesfield" },
    { id: 580, name: "Thamesmead East" },
    { id: 581, name: "Thamesmead Moorings" },
    { id: 582, name: "The Wrythe" },
    { id: 583, name: "Thornton" },
    { id: 584, name: "Thornton Heath" },
    { id: 585, name: "Thurlow Park" },
    { id: 586, name: "Tokyngton" },
    { id: 587, name: "Tollington" },
    { id: 588, name: "Tolworth & Hook Rise" },
    { id: 589, name: "Tooting" },
    { id: 590, name: "Tottenham Green" },
    { id: 591, name: "Tottenham Hale" },
    { id: 592, name: "Totteridge" },
    { id: 593, name: "Tower Hamlets" },
    { id: 594, name: "Town" },
    { id: 595, name: "Townfield" },
    { id: 596, name: "Trinity" },
    { id: 597, name: "Tudor" },
    { id: 598, name: "Tulse Hill" },
    { id: 599, name: "Turkey Street" },
    { id: 600, name: "Turnham Green" },
    { id: 601, name: "Twickenham" },
    { id: 602, name: "Twickenham Riverside" },
    { id: 603, name: "Underhill" },
    { id: 604, name: "Upminster" },
    { id: 605, name: "Upper Edmonton" },
    { id: 606, name: "Uxbridge" },
    { id: 607, name: "Uxbridge North" },
    { id: 608, name: "Uxbridge South" },
    { id: 609, name: "Valence" },
    { id: 610, name: "Valentines" },
    { id: 611, name: "Valley" },
    { id: 612, name: "Vassall" },
    { id: 613, name: "Victoria" },
    { id: 614, name: "Village" },
    { id: 615, name: "Vincent Square" },
    { id: 616, name: "Waddon" },
    { id: 617, name: "Wall End" },
    { id: 618, name: "Wallington North" },
    { id: 619, name: "Wallington South" },
    { id: 620, name: "Walpole" },
    { id: 621, name: "Waltham Forest" },
    { id: 622, name: "Walthamstow" },
    { id: 623, name: "Wandle Valley" },
    { id: 624, name: "Wandsworth" },
    { id: 625, name: "Wandsworth Common" },
    { id: 626, name: "Wanstead Park" },
    { id: 627, name: "Wanstead Village" },
    { id: 628, name: "Warwick" },
    { id: 629, name: "Watford" },
    { id: 630, name: "Wealdstone" },
    { id: 631, name: "Weavers" },
    { id: 632, name: "Welsh Harp" },
    { id: 633, name: "Wembley" },
    { id: 634, name: "Wembley Central" },
    { id: 635, name: "West Barnes" },
    { id: 636, name: "West Drayton" },
    { id: 637, name: "West End" },
    { id: 638, name: "West Finchley" },
    { id: 639, name: "West Green" },
    { id: 640, name: "West Ham" },
    { id: 641, name: "West Hampstead" },
    { id: 642, name: "West Harrow" },
    { id: 643, name: "West Heath" },
    { id: 644, name: "West Hendon" },
    { id: 645, name: "West Hill" },
    { id: 646, name: "West Putney" },
    { id: 647, name: "West Ruislip" },
    { id: 648, name: "West Thornton" },
    { id: 649, name: "West Twickenham" },
    { id: 650, name: "West Wickham" },
    { id: 651, name: "Westbourne" },
    { id: 652, name: "Whalebone" },
    { id: 653, name: "White Hart Lane" },
    { id: 654, name: "Whitechapel" },
    { id: 655, name: "Whitefoot" },
    { id: 656, name: "Whitton" },
    { id: 657, name: "Willesden Green" },
    { id: 658, name: "William Morris" },
    { id: 659, name: "Wimbledon" },
    { id: 660, name: "Wimbledon Park" },
    { id: 661, name: "Winchmore Hill" },
    { id: 662, name: "Wood Green" },
    { id: 663, name: "Wood Street" },
    { id: 664, name: "Woodberry Down" },
    { id: 665, name: "Woodhouse" },
    { id: 666, name: "Woodside" },
    { id: 667, name: "Woolwich Common" },
    { id: 668, name: "Woolwich Riverside" },
    { id: 669, name: "Worcester Park" },
    { id: 670, name: "Wormholt & White City" },
    { id: 671, name: "Yeading" },
    { id: 672, name: "Yiewsley" },

    { id: 673, name: "Abbey" },
    { id: 674, name: "Abbey Road" },
    { id: 675, name: "Abbey Wood" },
    { id: 676, name: "Abingdon" },
    { id: 677, name: "Acton Central" },
    { id: 678, name: "Addiscombe East" },
    { id: 679, name: "Addiscombe West" },
    { id: 680, name: "Addison" },
    { id: 681, name: "Aldborough" },
    { id: 682, name: "Alexandra" },
    { id: 683, name: "Alibon" },
    { id: 684, name: "Alperton" },
    { id: 685, name: "Angel" },
    { id: 686, name: "Askew" },
    { id: 687, name: "Avonmore & Brook Green" }

  ]
  const sampleLocations = [
    { id: "sl", name: "South London" },
    { id: "cl", name: "Central London" },
    { id: "nl", name: "North London" },
    { id: "el", name: "East London" },
    { id: "wl", name: "West London" },
    { id: "nel", name: "North East London" },
    { id: "nwl", name: "North West London" },
    { id: "swl", name: "South West London" },
    { id: "sel", name: "South East London" }
  ];
  allLocations.toSorted()

  const edinburghDistricts = [
    {
      id: 1,
      postcode: "EH1",
      name: "Edinburgh City Centre",
      addresses: [
        "1 Princes Street, Edinburgh, EH1 2EQ",
        "The Balmoral Hotel, 1 Princes Street, Edinburgh, EH1 2EQ",
        "Edinburgh Waverley Station, Edinburgh, EH1 1BQ"
      ]
    },
    {
      id: 2,
      postcode: "EH2",
      name: "New Town / City Centre",
      addresses: [
        "The Scotch Whisky Experience, 354 Castlehill, Edinburgh, EH2 4AE",
        "Assembly Rooms, 54 George Street, Edinburgh, EH2 2LR",
        "Harvey Nichols, 30-34 St Andrew Square, Edinburgh, EH2 2AD"
      ]
    },
    {
      id: 3,
      postcode: "EH3",
      name: "West End / Bruntsfield",
      addresses: [
        "The Royal College of Physicians, 9 Queen Street, Edinburgh, EH2 1JQ",
        "The Dome, 14 George Street, Edinburgh, EH2 2PF",
        "Tynecastle Park (Hearts FC), Gorgie Road, Edinburgh, EH11 2NL"
      ]
    },
    {
      id: 4,
      postcode: "EH4",
      name: "West Edinburgh (Murrayfield, Cramond, Davidson Mains)",
      addresses: [
        "Murrayfield Stadium, Roseburn Street, Edinburgh, EH12 5PJ",
        "Cramond Kirk, Cramond Glebe Road, Edinburgh, EH4 6NS",
        "Davidson Mains Park, 5 Quality Street, Edinburgh, EH4 5BP"
      ]
    },
    {
      id: 5,
      postcode: "EH5",
      name: "Trinity, Granton, Newhaven",
      addresses: [
        "Ocean Terminal, Ocean Drive, Edinburgh, EH6 6JJ",
        "Newhaven Harbour, 24 Pier Place, Edinburgh, EH6 4LP",
        "The Trinity Academy, Craighall Road, Edinburgh, EH6 4RT"
      ]
    },
    {
      id: 6,
      postcode: "EH6",
      name: "Leith",
      addresses: [
        "The Royal Yacht Britannia, Ocean Drive, Edinburgh, EH6 6JJ",
        "Leith Theatre, 28-30 Ferry Road, Edinburgh, EH6 4AE",
        "The Shore (Leith’s dining area), 1-3 Shore, Edinburgh, EH6 6QW"
      ]
    },
    {
      id: 7,
      postcode: "EH7",
      name: "Leith Walk, Easter Road, Calton Hill",
      addresses: [
        "Meadowbank Stadium, 200 London Road, Edinburgh, EH7 6AE",
        "Prestonfield House Hotel, Priestfield Road, Edinburgh, EH16 5UT",
        "The Edinburgh Playhouse, 18-22 Greenside Place, Edinburgh, EH1 3AA"
      ]
    },
    {
      id: 8,
      postcode: "EH8",
      name: "Holyrood, Old Town, University of Edinburgh",
      addresses: [
        "The Scottish Parliament, Holyrood, Edinburgh, EH99 1SP",
        "Dynamic Earth, Holyrood Road, Edinburgh, EH8 8AS",
        "University of Edinburgh Old College, South Bridge, Edinburgh, EH8 9YL"
      ]
    },
    {
      id: 9,
      postcode: "EH9",
      name: "Marchmont, Newington, Grange",
      addresses: [
        "The King’s Buildings (University of Edinburgh), Mayfield Road, Edinburgh, EH9 3JL",
        "Royal Commonwealth Pool, 21 Dalkeith Road, Edinburgh, EH16 5BB",
        "Prestonfield Golf Club, Priestfield Road, Edinburgh, EH16 5UT"
      ]
    },
    {
      id: 10,
      postcode: "EH10",
      name: "Morningside, Fairmilehead",
      addresses: [
        "Morningside Library, 184-192 Morningside Road, Edinburgh, EH10 4PD",
        "The Braid Hills Hotel, 134 Braid Road, Edinburgh, EH10 6JD",
        "Fairmilehead Parish Church, 1 Frogston Road West, Edinburgh, EH10 7AA"
      ]
    },
    {
      id: 11,
      postcode: "EH11",
      name: "Gorgie, Dalry, Shandon",
      addresses: [
        "Tynecastle Park (Heart of Midlothian FC), McLeod Street, Edinburgh, EH11 2NL",
        "Gorgie City Farm, 51 Gorgie Road, Edinburgh, EH11 2LA",
        "Dalry Swim Centre, 46 Dalry Road, Edinburgh, EH11 2AW"
      ]
    },
    {
      id: 12,
      postcode: "EH12",
      name: "Corstorphine, Murrayfield, West Coates",
      addresses: [
        "Edinburgh Zoo, 134 Corstorphine Road, Edinburgh, EH12 6TS",
        "Murrayfield Ice Rink, Riverside Crescent, Edinburgh, EH12 5XN",
        "Gyle Shopping Centre, 125 The Gyle Centre, Edinburgh, EH12 9JY"
      ]
    },
    {
      id: 13,
      postcode: "EH13",
      name: "Colinton, Juniper Green, Currie",
      addresses: [
        "Colinton Parish Church, 9 Bridge Road, Edinburgh, EH13 0LQ",
        "Currie Rugby Club, 32 Lanark Road West, Edinburgh, EH13 0PQ",
        "Juniper Green Bowling Club, 170 Lanark Road, Edinburgh, EH13 0DQ"
      ]
    },
    {
      id: 14,
      postcode: "EH14",
      name: "Balerno, Baberton, Wester Hailes",
      addresses: [
        "Balerno Parish Church, 2 Main Street, Balerno, Edinburgh, EH14 7EH",
        "Baberton Golf Club, 50 Baberton Avenue, Edinburgh, EH14 3DR",
        "Wester Hailes Library, 5 Westside Plaza, Edinburgh, EH14 2ST"
      ]
    },
    {
      id: 15,
      postcode: "EH15",
      name: "Portobello, Craigmillar, Joppa",
      addresses: [
        "Portobello Beach Promenade, Edinburgh, EH15 1DB",
        "Portobello Swim Centre, 57 The Promenade, Edinburgh, EH15 1DX",
        "Craigmillar Castle, Craigmillar Castle Road, Edinburgh, EH16 4SY"
      ]
    },
    {
      id: 16,
      postcode: "EH16",
      name: "Liberton, Gilmerton, Craigmillar",
      addresses: [
        "Liberton Kirk, 1 Kirkgate, Edinburgh, EH16 6RR",
        "Royal Infirmary of Edinburgh, 51 Little France Crescent, Edinburgh, EH16 4SA",
        "Gilmerton Community Centre, 4-6 Drum Street, Edinburgh, EH17 8QG"
      ]
    },
    {
      id: 17,
      postcode: "EH17",
      name: "Danderhall, Newcraighall, Edgefield",
      addresses: [
        "Danderhall Medical Centre, 1 Oak Lane, Danderhall, Edinburgh, EH16 4EX",
        "Newcraighall Parish Church, 1 Newcraighall Road, Edinburgh, EH21 8SF",
        "Edinburgh College (Milton Road Campus), 24 Milton Road East, Edinburgh, EH15 2PP"
      ]
    },
    {
      id: 18,
      postcode: "EH28",
      name: "Kirkliston, Newbridge, Ratho",
      addresses: [
        "Kirkliston Leisure Centre, 37 Station Road, Kirkliston, EH29 9AQ",
        "Ratho Park Golf Club, 7 Baird Road, Ratho, EH28 8RA",
        "Newbridge Industrial Estate, 1 Newbridge Industrial Estate, EH28 8PJ"
      ]
    },
    {
      id: 19,
      postcode: "EH29",
      name: "Kirkliston, Winchburgh",
      addresses: [
        "Kirkliston Primary School, The Loan, Kirkliston, EH29 9EB",
        "Winchburgh Community Centre, 6-8 High Street, Winchburgh, EH52 6HW",
        "Drumshoreland Garden Centre, 5 Drumshoreland Road, Kirkliston, EH29 9DU"
      ]
    },
    {
      id: 20,
      postcode: "EH30",
      name: "South Queensferry, Dalmeny",
      addresses: [
        "Forth Bridge, South Queensferry, EH30 9SF",
        "Dalmeny House, South Queensferry, EH30 9TQ",
        "Hopetoun Farm Shop, South Queensferry, EH30 9SL"
      ]
    },

    {
      id: 21,
      name: "Duddingston",
    },
    {
      id: 22,
      name: "East Craigs",
    },
    {
      id: 23,
      name: "Ferniehill",
    },
    {
      id: 24,
      name: "Gogar",
    },
    {
      id: 25,
      name: "Ingliston",
    },
    {
      id: 26,
      name: "Kaimes",
    },
    {
      id: 27,
      name: "Liberton (Greater)",
    },
    {
      id: 28,
      name: "Little France",
    },
    {
      id: 29,
      name: "Mayfield",
    },
    {
      id: 30,
      name: "Moredun",
    },
    {
      id: 31,
      name: "King's Knowe",
    },
    {
      id: 32,
      name: "Muirhouse",
    },
    {
      id: 33,
      name: "Oxgangs",
    },
    {
      id: 34,
      name: "Pentland Hills",
    },
    {
      id: 35,
      name: "Ratho Station",
    },
    {
      id: 36,
      name: "Sighthill",
    },
    {
      id: 37,
      name: "Slateford",
    },
    {
      id: 38,
      name: "Swanston",
    },
    {
      id: 39,
      name: "The Inch",
    },

    {
      id: 40,
      postcode: "EH18",
      name: "Lasswade",
      addresses: [
        "Lasswade High School, Eskdale Drive, Lasswade, EH18 1PB",
        "Danderhall Medical Centre, 1 Oak Lane, Danderhall, EH18 1BU",
        "Polton Mill, Lasswade Road, EH18 1PP"
      ]
    },
    {
      id: 41,
      postcode: "EH19",
      name: "Bonnyrigg",
      addresses: [
        "Bonnyrigg Town Hall, High Street, Bonnyrigg, EH19 2AE",
        "Lochrin Kennels, 22 Broomieknowe, Bonnyrigg, EH19 2JG",
        "Newbattle Abbey College, Newbattle Road, EH19 3JA"
      ]
    },
    {
      id: 42,
      postcode: "EH20",
      name: "Loanhead",
      addresses: [
        "Loanhead Leisure Centre, Clerk Street, Loanhead, EH20 9DR",
        "IKEA Edinburgh, Straiton Retail Park, EH20 9PW",
        "Pentland Hills Regional Park, EH20 9QZ"
      ]
    },
    {
      id: 43,
      postcode: "EH21",
      name: "Musselburgh",
      addresses: [
        "Musselburgh Racecourse, Linkfield Road, EH21 7RG",
        "The Brunton Theatre, Ladywell Way, EH21 6AA",
        "Musselburgh Golf Club, Monktonhall, EH21 6SW"
      ]
    },
    {
      id: 44,
      postcode: "EH22",
      name: "Dalkeith",
      addresses: [
        "Dalkeith Country Park, EH22 2NA",
        "St David's RC High School, Cousland Road, EH22 2PS",
        "Eskmills Railway Station, EH22 1AG"
      ]
    },
    {
      id: 45,
      postcode: "EH23",
      name: "Gorebridge",
      addresses: [
        "Gorebridge Leisure Centre, Hunterfield Road, EH23 4TT",
        "Arniston House, Gorebridge, EH23 4RY",
        "Newtongrange Railway Station, EH23 4LF"
      ]
    },
    {
      id: 46,
      postcode: "EH24",
      name: "Roslin",
      addresses: [
        "Rosslyn Chapel, Chapel Loan, EH25 9PU",
        "Roslin Institute, EH25 9RG",
        "Bilston Glen Industrial Estate, EH25 9SP"
      ]
    },
    {
      id: 47,
      postcode: "EH25",
      name: "Roslin",
      addresses: [
        "Roslyn Glen Country Park, EH25 9LX",
        "Eskview Medical Centre, 1 Eskview Terrace, EH25 9JA",
        "Roslin War Memorial, EH25 9PX"
      ]
    },
    {
      id: 48,
      postcode: "EH26",
      name: "Easter Bush",
      addresses: [
        "The Royal (Dick) School of Veterinary Studies, EH25 9RG",
        "Bush House, Easter Bush Campus, EH25 9RG",
        "Pentland Hills Walking Routes, EH26 0PJ"
      ]
    },
    {
      id: 49,
      postcode: "EH27",
      name: "Kirknewton",
      addresses: [
        "Kirknewton War Memorial, EH27 8DA",
        "East Calder Library, Langton Road, EH27 8DQ",
        "Harperrig Reservoir, EH27 8DN"
      ]
    },
       // council
    { id: 50, name: "Midlothian", type: "Council Area", notable: "Local government region south of Edinburgh" },
    { id: 53, name: "Penicuik", type: "Town", notable: "Former paper-mill town near Pentland Hills" },
    { id: 54, name: "Loanhead", type: "Town", notable: "Home to Straiton Retail Park" },
    { id: 56, name: "Newtongrange", type: "Village", notable: "National Mining Museum Scotland" },
    { id: 58, name: "Bilston", type: "Village", notable: "Bilston Glen Viaduct" },
    { id: 59, name: "Lasswade", type: "Village", notable: "Polton Mill and scenic river walks" },

    // Villages (IDs 60-79)
    { id: 60, name: "Mayfield", type: "Village", notable: "Post-war residential development" },
    { id: 61, name: "Eskbank", type: "Village", notable: "Eskbank Railway Station (heritage line)" },
    { id: 62, name: "Auchendinny", type: "Village", notable: "18th-century paper mill ruins" },
    { id: 63, name: "Temple", type: "Village", notable: "Knights Templar connections" },
    { id: 64, name: "Carrington", type: "Village", notable: "Rural farmland and Carrington Church" },
    { id: 65, name: "Rosewell", type: "Village", notable: "Roslin Glen Country Park access" },
    { id: 66, name: "Pathhead", type: "Village", notable: "Pathhead Sands and Prestonhall Estate" },
    { id: 67, name: "Fushiebridge", type: "Hamlet", notable: "Fushiebridge Inn and Fala Flow" },
    { id: 68, name: "North Middleton", type: "Village", notable: "Middleton Limeworks" },
    { id: 69, name: "Glencreg", type: "Hamlet", notable: "Glencreg House" },
    { id: 70, name: "Howgate", type: "Hamlet", notable: "Howgate Inn (historic coaching stop)" },
    { id: 71, name: "Edinburgh Airport", type: "Area", notable: "Technically in West Lothian but serves Midlothian" },
    { id: 72, name: "Borthwick", type: "Village", notable: "Borthwick Castle (15th-century fortress)" },
    { id: 73, name: "Crichton", type: "Village", notable: "Crichton Collegiate Church" },
    { id: 74, name: "Vogrie", type: "Hamlet", notable: "Vogrie Country Park" },
    { id: 75, name: "Tynewater", type: "Village", notable: "Tyneholm Farm" },
    { id: 76, name: "Newlandrig", type: "Hamlet", notable: "Small farming community" },
    { id: 77, name: "Edgehead", type: "Village", notable: "Near A68 scenic route" },
    { id: 78, name: "Tynedale", type: "Area", notable: "Tyne Valley walks" },
    { id: 79, name: "Fala", type: "Village", notable: "Fala Flow moorland" },

    // Historical/Outlying Areas (IDs 80-99)
    { id: 80, name: "Arniston", type: "Estate", notable: "Arniston House (historic mansion)" },
    { id: 81, name: "Prestonhall", type: "Estate", notable: "Prestonhall House" },
    { id: 82, name: "Polton", type: "Village", notable: "Polton Mill and River North Esk" },
    { id: 83, name: "Temple Kirk", type: "Ruins", notable: "Medieval church ruins" },
    { id: 84, name: "Birkenside", type: "Hamlet", notable: "Birkenside House" },
    { id: 85, name: "Sheriffhall", type: "Junction", notable: "Major road interchange" },
    { id: 86, name: "Smeaton", type: "Hamlet", notable: "Smeaton House" },
    { id: 87, name: "Easter Howgate", type: "Hamlet", notable: "Near Howgate Inn" },
    { id: 88, name: "Oatslie", type: "Area", notable: "Residential part of Penicuik" },
    { id: 89, name: "Hillend", type: "Area", notable: "Hillend Ski Centre (Pentlands)" },
    { id: 90, name: "Nine Mile Burn", type: "Hamlet", notable: "Scenic stop on A702" },
    { id: 91, name: "Silverburn", type: "Park", notable: "Silverburn Park in Penicuik" },
    { id: 92, name: "Glencorse", type: "Area", notable: "Glencorse Barracks" },
    { id: 93, name: "Mortonhall", type: "Estate", notable: "Mortonhall Caravan Park" },
    { id: 94, name: "Gowkley Moss", type: "Landmark", notable: "Peatland area" },
    { id: 95, name: "Cauldcoats", type: "Hamlet", notable: "Near Gorebridge" },
    { id: 96, name: "Ford", type: "Hamlet", notable: "Fordel Hill" },
    { id: 97, name: "Salters Road", type: "Area", notable: "Industrial zone in Dalkeith" },
    { id: 98, name: "Eldindean", type: "Farm", notable: "Rural farmland" },
    { id: 99, name: "Glenholm", type: "Valley", notable: "Remote glen in Pentlands"}

  ];
  const edinburghLocations = [
    {
      id: 3,
      name: "Portobello",
    },
    {
      id: 4,
      name: "Morningside",
    },
    {
      id: 5,
      name: "Cramond",
    },
    {
      id: 6,
      name: "Stockbridge",
    },
    {
      id: 31,
      name: "Bingham",
    },
    {
      id: 32,
      name: "Blackhall",
    },
    {
      id: 33,
      name: "Bonaly",
    },
    {
      id: 34,
      name: "Burghmuirhead",
    },
    {
      id: 40,
      name: "West Pilton",
    }
  ];



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locations, setLocations] = useState(edinburghLocations);
  const [locationList, setLocationList] = useState(miniLocations2);
  const [isAllLocations, setIsAllLocations] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(edinburghLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [cleanerLocation, setCleanerLocation] = useState('');
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState(null);
  const [listName, setListName] = useState('Edin');
  const [edin, setEdin] = useState(true);
  const [more, setMore] = useState(false);

  // Sample data - in a real app you would fetch this from an API
  useEffect(() => {


  }, []);


  useEffect(() => {
    const masterList = [];
    if (edin) {
      masterList.push(...edinburghLocations);
      masterList.push(...edinburghDistricts);
    }
    if (more) {
      masterList.push(...edinburghLocations);
      masterList.push(...edinburghDistricts);
      masterList.push(...allLocations);
      masterList.push(...sampleLocations);
    }

    if (searchTerm.trim() === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = masterList.filter(location =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm, locations]);

  const findCity = () => {
  //  setCleanerLocation();
  //  console.log(city);
  }

  const updateLocationList = () => {
    if (more) {
      if (locationList.length === miniLocations.length) {
        setLocationList(allLocations);
      }
      else {
        setLocationList(miniLocations)
      }
    }
    if (edin) {
      if (locationList.length === miniLocations2.length) {
        setLocationList(edinburghDistricts);
      }
      else {
        setLocationList(miniLocations2)
      }
    }
    setIsAllLocations(!isAllLocations);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const updateList = (name) => {
    if (listName === name) {
      return;
    }
    if (name === 'Edin') {
      setEdin(true)
      setMore(false)
      setLocationList(miniLocations2)
      setLocations(edinburghLocations);
      setFilteredLocations(edinburghLocations);
    }
    if (name === 'More') {
      setMore(true)
      setEdin(false)
      setLocationList(miniLocations)
      setLocations(sampleLocations);
      setFilteredLocations(sampleLocations);
    }
    setListName(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }
    if (!isValidUKPostcodeFormat(postcode)) {
      setError(`${postcode} is not a valid postcode`);
      return;
    }
    checkPostcodeExists(postcode).then(exists => {
      if (!exists) {
        setError(`${postcode} does not exist`);
        return;
      }
    })

    navigate('/checkout', { state: { postcode: postcode } });
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      setCleanerLocation(e.target.value);
      return;
    }
    setSearchTerm('');
    setCleanerLocation('');
  }

  const handleOnChange = (e) => {}

  // target="_blank" rel="noopener noreferrer"

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>

        <section className="location-banner">
          <div className="container">
            <h1 className={'location-header'}>Our Cleaner Locations</h1>
            <h4 style={{justifyContent:'center', color:'blue', maxWidth:'1000px', textAlign:'start', marginTop:'10px', backgroundColor:'transparent'}}>
              Get professional home and office cleaning in London and the surrounding areas. Search for a local cleaner,
              book the service and they will arrive at your location shortly. Our cleaners have extensive experience and
              skills to satisfy all your cleaning needs. Enter your postcode to find a cleaner near you.
            </h4>

            <section className="search-section">
              <div className="search-container">
                <input
                    type="text"
                    placeholder="find cleaner closest to you"
                    value={cleanerLocation}
                    onChange={handleLocationSearch}
                />
                <button className="search-button"
                onClick={(e) => setSearchTerm(cleanerLocation)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Find
                </button>
              </div>
            </section>
          </div>
        </section>

        <div className={'support-page'} >
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <div className={'location-name'}
            onClick={() => updateList('Edin')}>
              <input type={'checkbox'} onChange={handleOnChange} checked={edin}/>
              <h2 className={'experience-text'} style={{marginLeft:'5px'}} >Edinburgh Only</h2>
            </div>
            <div className={'location-name'}
            onClick={() => updateList('More')}>
              <input type={'checkbox'} onChange={handleOnChange} checked={more}/>
              <h2 className={'experience-text'} style={{marginLeft:'5px'}} >More Locations</h2>
            </div>

          </div>
        </div>

        <main className="locations-main">
          <div className="container">

            <section className={["locations-grid", "main-banner"].join("")} style={{marginTop:'30px'}}>
              {filteredLocations.length > 0 ? (
                  <div className="grid-container">
                    {filteredLocations.map(location => (
                        <div className="location-card" key={location.id}>
                          <div className="card-content">
                            <h3 style={{textAlign:'center'}}>
                              <Link to="/city" state={{ id: location.id, name: location.name }}>
                                {location.name}
                              </Link>
                            </h3>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="no-results">
                    <p>No locations found matching your search.</p>
                  </div>
              )}
            </section>

            <section className={'main-banner'} ref={ref}>
              <h2 style={{textAlign:'center', padding:'20px'}}>More Locations</h2>
              <div style={{display:'block'}}>
                <div className="grid-container">
                  {locationList.map(location => (
                      <div className="location-card" key={location.id}>
                        <div className="card-content">
                          <ul>
                            <li style={{textAlign:'center'}}>
                              <Link to="/city"  state={{ id: location.id, name: location.name }}>
                                {location.name}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                  ))}
                </div>
                <button onClick={updateLocationList} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>
                  {!isAllLocations ? 'See more' : 'See less'}
                </button>
              </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'20px'}}>
              <h2 style={{textAlign:'center'}}>Can't find your location?</h2>
              <p style={{textAlign:'center'}}>We're expanding our services to new areas all the time. Contact us to inquire about availability in your area.</p>
              <Link to="/contact" className="cta-button" style={{textAlign:'center', color:'white'}}>Contact Us</Link>
            </section>

            <section className={'main-banner'} style={{marginBottom:'30px', marginTop:'30px'}}>
              <div className="container">
                <div className="burden-container">
                  <img src={Sweeping} className={'cart-image4'} alt="" />
                  <div className="search-container">
                    <h3 style={{textAlign:'start', paddingLeft:'10px', paddingRight:'10px'}} className={'help-text'}>Shift your cleaning burden to us</h3>
                    <input
                        type="text" placeholder="Enter your full post code here"
                        value={postcode}
                        style={{textAlign:'center'}}
                        name={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                    {error && <span className="error-message">{error}</span>}
                    <button onClick={handleSubmit} className={'next-button'} style={{textAlign:'center', margin:'10px'}}>Get a quote</button>
                  </div>
                  <img src={Arranged} className={'cart-image4'} alt="" />
                </div>
              </div>

            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Locations;