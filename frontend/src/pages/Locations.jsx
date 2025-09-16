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
    { id: 1, category: "Abbey" },
    { id: 2, category: "Abbey Road" },
    { id: 3, category: "Abbey Wood" },
    { id: 4, category: "Abingdon" },
    { id: 5, category: "Acton Central" },
  ]
  const miniLocations2 = [
    {
      id: 1,
      postcode: "EH1",
      category: "Edinburgh City Centre",
      addresses: [
        "1 Princes Street, Edinburgh, EH1 2EQ",
        "The Balmoral Hotel, 1 Princes Street, Edinburgh, EH1 2EQ",
        "Edinburgh Waverley Station, Edinburgh, EH1 1BQ"
      ]
    },
    {
      id: 2,
      postcode: "EH2",
      category: "New Town / City Centre",
      addresses: [
        "The Scotch Whisky Experience, 354 Castlehill, Edinburgh, EH2 4AE",
        "Assembly Rooms, 54 George Street, Edinburgh, EH2 2LR",
        "Harvey Nichols, 30-34 St Andrew Square, Edinburgh, EH2 2AD"
      ]
    },
    {
      id: 3,
      postcode: "EH3",
      category: "West End / Bruntsfield",
      addresses: [
        "The Royal College of Physicians, 9 Queen Street, Edinburgh, EH2 1JQ",
        "The Dome, 14 George Street, Edinburgh, EH2 2PF",
        "Tynecastle Park (Hearts FC), Gorgie Road, Edinburgh, EH11 2NL"
      ]
    },
    {
      id: 4,
      postcode: "EH4",
      category: "West Edinburgh (Murrayfield, Cramond, Davidson Mains)",
      addresses: [
        "Murrayfield Stadium, Roseburn Street, Edinburgh, EH12 5PJ",
        "Cramond Kirk, Cramond Glebe Road, Edinburgh, EH4 6NS",
        "Davidson Mains Park, 5 Quality Street, Edinburgh, EH4 5BP"
      ]
    },
    {
      id: 5,
      postcode: "EH5",
      category: "Trinity, Granton, Newhaven",
      addresses: [
        "Ocean Terminal, Ocean Drive, Edinburgh, EH6 6JJ",
        "Newhaven Harbour, 24 Pier Place, Edinburgh, EH6 4LP",
        "The Trinity Academy, Craighall Road, Edinburgh, EH6 4RT"
      ]
    },
  ]

  const allLocations = [
    { id: 1, category: "Abbey" },
    { id: 2, category: "Abbey Road" },
    { id: 3, category: "Abbey Wood" },
    { id: 4, category: "Abingdon" },
    { id: 5, category: "Acton Central" },
    { id: 6, category: "Addiscombe East" },
    { id: 7, category: "Addiscombe West" },
    { id: 8, category: "Addison" },
    { id: 9, category: "Aldborough" },
    { id: 10, category: "Alexandra" },
    { id: 11, category: "Alibon" },
    { id: 12, category: "Alperton" },
    { id: 13, category: "Angel" },
    { id: 14, category: "Askew" },
    { id: 15, category: "Avonmore & Brook Green" },
    { id: 252, category: "Grove Green" },
    { id: 253, category: "Grove Park" },
    { id: 254, category: "Hackney" },
    { id: 255, category: "Hackney Central" },
    { id: 256, category: "Hackney Downs" },
    { id: 257, category: "Hackney Wick" },

    // New items (16-75)
    { id: 16, category: "Balham" },
    { id: 17, category: "Barking" },
    { id: 18, category: "Barkingside" },
    { id: 19, category: "Barnehurst" },
    { id: 20, category: "Barnes" },
    { id: 21, category: "Barnet" },
    { id: 22, category: "Barnhill" },
    { id: 23, category: "Barnsbury" },
    { id: 24, category: "Battersea" },
    { id: 25, category: "Bayswater" },
    { id: 26, category: "Beckenham" },
    { id: 27, category: "Beckton" },
    { id: 28, category: "Becontree" },
    { id: 29, category: "Beddington North" },
    { id: 30, category: "Beddington South" },
    { id: 31, category: "Bedfont" },
    { id: 32, category: "Bedford" },
    { id: 33, category: "Bellingham" },
    { id: 34, category: "Belmont" },
    { id: 35, category: "Belsize" },
    { id: 36, category: "Belvedere" },
    { id: 37, category: "Bensham Manor" },
    { id: 38, category: "Berrylands" },
    { id: 39, category: "Bethnal Green" },
    { id: 40, category: "Beverley" },
    { id: 41, category: "Bexley" },
    { id: 42, category: "Bexleyheath" },
    { id: 43, category: "Bickley" },
    { id: 44, category: "Biggin Hill" },
    { id: 45, category: "Bishop's" },
    { id: 46, category: "Blackfen & Lamorbey" },
    { id: 47, category: "Blackheath" },
    { id: 48, category: "Blackheath Westcombe" },
    { id: 49, category: "Blackwall & Cubitt Town" },
    { id: 50, category: "Blendon & Penhill" },
    { id: 51, category: "Bloomsbury" },
    { id: 52, category: "Boleyn" },
    { id: 53, category: "Borehamwood" },
    { id: 54, category: "Borough & Bankside" },
    { id: 55, category: "Botwell" },
    { id: 56, category: "Bounds Green" },
    { id: 57, category: "Bow East" },
    { id: 58, category: "Bow West" },
    { id: 59, category: "Bowes" },
    { id: 60, category: "Brent" },
    { id: 61, category: "Brentford" },
    { id: 62, category: "Bridge" },
    { id: 63, category: "Brixton" },
    { id: 64, category: "Brixton Hill" },
    { id: 65, category: "Broad Green" },
    { id: 66, category: "Brockley" },
    { id: 67, category: "Bromley" },
    { id: 68, category: "Bromley Common & Keston" },
    { id: 69, category: "Bromley North" },
    { id: 70, category: "Bromley South" },
    { id: 71, category: "Bromley Town" },
    { id: 72, category: "Brompton & Hans Town" },
    { id: 73, category: "Brondesbury Park" },
    { id: 74, category: "Brooklands" },
    { id: 75, category: "Brownswood" },
    { id: 76, category: "Bruce Grove" },
    { id: 77, category: "Brunel" },
    { id: 78, category: "Brunswick Park" },
    { id: 79, category: "Bryanston & Dorset Square" },
    { id: 80, category: "Bunhill" },
    { id: 81, category: "Burnt Oak" },
    { id: 82, category: "Bush Hill Park" },
    { id: 83, category: "Caledonian" },
    { id: 84, category: "Camberwell Green" },
    { id: 85, category: "Camden" },
    { id: 86, category: "Camden Town with Primrose Hill" },
    { id: 87, category: "Campden" },
    { id: 88, category: "Canary Wharf" },
    { id: 89, category: "Canbury" },
    { id: 90, category: "Cann Hall" },
    { id: 91, category: "Canning Town North" },
    { id: 92, category: "Canning Town South" },
    { id: 93, category: "Cannon Hill" },
    { id: 94, category: "Canonbury" },
    { id: 95, category: "Canons" },
    { id: 96, category: "Cantelowes" },
    { id: 97, category: "Carshalton Central" },
    { id: 98, category: "Carshalton South and Clockhouse" },
    { id: 99, category: "Catford South" },
    { id: 100, category: "Cathall" },
    { id: 101, category: "Cavendish" },
    { id: 102, category: "Cazenove" },
    { id: 103, category: "Chadwell" },
    { id: 104, category: "Chadwell Heath" },
    { id: 105, category: "Champion Hill" },
    { id: 106, category: "Chapel End" },
    { id: 107, category: "Charlton" },
    { id: 108, category: "Charville" },
    { id: 109, category: "Chase" },
    { id: 110, category: "Chaucer" },
    { id: 111, category: "Cheam" },
    { id: 112, category: "Chelsea Riverside" },
    { id: 113, category: "Chelsfield & Pratts Bottom" },
    { id: 114, category: "Chessington North & Hook" },
    { id: 115, category: "Chessington South" },
    { id: 116, category: "Childs Hill" },
    { id: 117, category: "Chingford Green" },
    { id: 118, category: "Chislehurst" },
    { id: 119, category: "Chiswick" },
    { id: 120, category: "Chiswick Homefields" },
    { id: 121, category: "Chiswick Riverside" },
    { id: 122, category: "Church Street" },
    { id: 123, category: "Churchfields" },
    { id: 124, category: "Churchill" },
    { id: 125, category: "City of Westminster" },
    { id: 126, category: "Clapham" },
    { id: 127, category: "Clapham Common" },
    { id: 128, category: "Clayhall" },
    { id: 129, category: "Clementswood" },
    { id: 130, category: "Clerkenwell" },
    { id: 131, category: "Cleveland" },
    { id: 132, category: "Clissold" },
    { id: 133, category: "Clock House" },
    { id: 134, category: "Cockfosters" },
    { id: 135, category: "Coldharbour" },
    { id: 136, category: "Coldharbour & New Eltham" },
    { id: 137, category: "Colindale" },
    { id: 138, category: "College Park & Old Oak" },
    { id: 139, category: "Colliers Wood" },
    { id: 140, category: "Colville" },
    { id: 141, category: "Coombe Hill" },
    { id: 142, category: "Coombe Vale" },
    { id: 143, category: "Copers Cope" },
    { id: 144, category: "Coppetts" },
    { id: 145, category: "Coulsdon Town" },
    { id: 146, category: "Courtfield" },
    { id: 147, category: "Cranbrook" },
    { id: 148, category: "Cranford" },
    { id: 149, category: "Cranham" },
    { id: 150, category: "Cray Valley East" },
    { id: 151, category: "Cray Valley West" },
    { id: 152, category: "Crayford" },
    { id: 153, category: "Cricket Green" },
    { id: 154, category: "Crofton Park" },
    { id: 155, category: "Crook Log" },
    { id: 156, category: "Crouch End" },
    { id: 157, category: "Croydon" },
    { id: 158, category: "Crystal Palace" },
    { id: 159, category: "Crystal Palace & Upper Norwood" },
    { id: 160, category: "Custom House" },
    { id: 161, category: "Dalgarno" },
    { id: 162, category: "Dalston" },
    { id: 163, category: "Darwin" },
    { id: 164, category: "De Beauvoir" },
    { id: 165, category: "Dollis Hill" },
    { id: 166, category: "Dormers Wells" },
    { id: 167, category: "Downham" },
    { id: 168, category: "Dudden Hill" },
    { id: 169, category: "Dulwich" },
    { id: 170, category: "Dulwich Hill" },
    { id: 171, category: "Dulwich Village" },
    { id: 172, category: "Dulwich Wood" },
    { id: 173, category: "Dundonald" },
    { id: 174, category: "Ealing" },
    { id: 175, category: "Ealing Broadway" },
    { id: 176, category: "Ealing Common" },
    { id: 177, category: "Earl's Court" },
    { id: 178, category: "Earlsfield" },
    { id: 179, category: "East Acton" },
    { id: 180, category: "East Barnet" },
    { id: 181, category: "East Finchley" },
    { id: 182, category: "East Ham Central" },
    { id: 183, category: "East Ham North" },
    { id: 184, category: "East Ham South" },
    { id: 185, category: "East Putney" },
    { id: 186, category: "East Sheen" },
    { id: 187, category: "East Wickham" },
    { id: 188, category: "Eastbrook" },
    { id: 189, category: "Eastbury" },
    { id: 190, category: "Eastcote & East Ruislip" },
    { id: 191, category: "Edgware" },
    { id: 192, category: "Edmonton Green" },
    { id: 193, category: "Elm Park" },
    { id: 194, category: "Eltham North" },
    { id: 195, category: "Eltham South" },
    { id: 196, category: "Eltham West" },
    { id: 197, category: "Elthorne" },
    { id: 198, category: "Emerson Park" },
    { id: 199, category: "Endlebury" },
    { id: 200, category: "Enfield" },
    { id: 201, category: "Enfield Highway" },
    { id: 202, category: "Enfield Lock" },
    { id: 203, category: "Erith" },
    { id: 204, category: "Evelyn" },
    { id: 205, category: "Fairfield" },
    { id: 206, category: "Fairlop" },
    { id: 207, category: "Falconwood & Welling" },
    { id: 208, category: "Faraday" },
    { id: 209, category: "Farnborough & Crofton" },
    { id: 210, category: "Feltham North" },
    { id: 211, category: "Feltham West" },
    { id: 212, category: "Ferndale" },
    { id: 213, category: "Figge's Marsh" },
    { id: 214, category: "Finchley" },
    { id: 215, category: "Finchley Church End" },
    { id: 216, category: "Finsbury Park" },
    { id: 217, category: "Forest" },
    { id: 218, category: "Forest Gate North" },
    { id: 219, category: "Forest Gate South" },
    { id: 220, category: "Forest Hill" },
    { id: 221, category: "Fortis Green" },
    { id: 222, category: "Fortune Green" },
    { id: 223, category: "Frognal & Fitzjohns" },
    { id: 224, category: "Fryent" },
    { id: 225, category: "Fulham" },
    { id: 226, category: "Fulham Broadway" },
    { id: 227, category: "Fulham Reach" },
    { id: 228, category: "Fullwell" },
    { id: 229, category: "Fulwell & Hampton Hill" },
    { id: 230, category: "Furzedown" },
    { id: 231, category: "Garden Suburb" },
    { id: 232, category: "Gascoigne" },
    { id: 233, category: "Gipsy Hill" },
    { id: 234, category: "Glyndon" },
    { id: 235, category: "Golborne" },
    { id: 236, category: "Golders Green" },
    { id: 237, category: "Goodmayes" },
    { id: 238, category: "Goose Green" },
    { id: 239, category: "Gooshays" },
    { id: 240, category: "Goresbrook" },
    { id: 241, category: "Gospel Oak" },
    { id: 242, category: "Grange" },
    { id: 243, category: "Graveney" },
    { id: 244, category: "Green Street East" },
    { id: 245, category: "Green Street West" },
    { id: 246, category: "Greenford Broadway" },
    { id: 247, category: "Greenford Green" },
    { id: 248, category: "Greenhill" },
    { id: 249, category: "Greenwich" },
    { id: 250, category: "Greenwich West" },
    { id: 251, category: "Grove" },
    { id: 252, category: "Grove Green" },
    { id: 253, category: "Grove Park" },
    { id: 254, category: "Hackney" },
    { id: 255, category: "Hackney Central" },
    { id: 256, category: "Hackney Downs" },
    { id: 257, category: "Hackney Wick" },
    { id: 258, category: "Hacton" },
    { id: 259, category: "Haggerston" },
    { id: 260, category: "Hainault" },
    { id: 261, category: "Hale" },
    { id: 262, category: "Hale End & Highams Park" },
    { id: 263, category: "Ham, Petersham & Richmond Riverside" },
    { id: 264, category: "Hammersmith & Fulham" },
    { id: 265, category: "Hammersmith Broadway" },
    { id: 266, category: "Hampstead" },
    { id: 267, category: "Hampton" },
    { id: 268, category: "Hampton North" },
    { id: 269, category: "Hampton Wick" },
    { id: 270, category: "Hanger Hill" },
    { id: 271, category: "Hanworth" },
    { id: 272, category: "Hanworth Park" },
    { id: 273, category: "Harefield" },
    { id: 274, category: "Haringey" },
    { id: 275, category: "Harlesden" },
    { id: 276, category: "Harold Wood" },
    { id: 277, category: "Harringay" },
    { id: 278, category: "Harrow" },
    { id: 279, category: "Harrow on the Hill" },
    { id: 280, category: "Harrow Road" },
    { id: 281, category: "Harrow Weald" },
    { id: 282, category: "Haselbury" },
    { id: 283, category: "Hatch End" },
    { id: 284, category: "Hatch Lane" },
    { id: 285, category: "Havering" },
    { id: 286, category: "Havering Park" },
    { id: 287, category: "Haverstock" },
    { id: 288, category: "Hayes & Coney Hall" },
    { id: 289, category: "Headstone North" },
    { id: 290, category: "Headstone South" },
    { id: 291, category: "Heath" },
    { id: 292, category: "Heathfield" },
    { id: 293, category: "Heathrow Villages" },
    { id: 294, category: "Heaton" },
    { id: 295, category: "Hendon" },
    { id: 296, category: "Herne Hill" },
    { id: 297, category: "Heston Central" },
    { id: 298, category: "Heston East" },
    { id: 299, category: "Heston West" },
    { id: 300, category: "High Barnet" },
    { id: 301, category: "High Street" },
    { id: 302, category: "Higham Hill" },
    { id: 303, category: "Highbury East" },
    { id: 304, category: "Highbury West" },
    { id: 305, category: "Highgate" },
    { id: 306, category: "Highlands" },
    { id: 307, category: "Hillingdon" },
    { id: 308, category: "Hillingdon East" },
    { id: 309, category: "Hillrise" },
    { id: 310, category: "Hillside" },
    { id: 311, category: "Hither Green" },
    { id: 312, category: "Hobbayne" },
    { id: 313, category: "Hoe Street" },
    { id: 314, category: "Holborn & Covent Garden" },
    { id: 315, category: "Holland" },
    { id: 316, category: "Holloway" },
    { id: 317, category: "Homerton" },
    { id: 318, category: "Hornchurch" },
    { id: 319, category: "Hornsey" },
    { id: 320, category: "Hounslow" },
    { id: 321, category: "Hounslow Central" },
    { id: 322, category: "Hounslow Heath" },
    { id: 323, category: "Hounslow South" },
    { id: 324, category: "Hounslow West" },
    { id: 325, category: "Hoxton East & Shoreditch" },
    { id: 326, category: "Hoxton West" },
    { id: 327, category: "Hyde Park" },
    { id: 328, category: "Hylands" },
    { id: 329, category: "Ickenham" },
    { id: 330, category: "Ilford" },
    { id: 331, category: "Island Gardens" },
    { id: 332, category: "Isleworth" },
    { id: 333, category: "Islington" },
    { id: 334, category: "Jubilee" },
    { id: 335, category: "Junction" },
    { id: 336, category: "Kelsey & Eden Park" },
    { id: 337, category: "Kenley" },
    { id: 338, category: "Kensal Green" },
    { id: 339, category: "Kensington & Chelsea" },
    { id: 340, category: "Kentish Town" },
    { id: 341, category: "Kenton" },
    { id: 342, category: "Kenton East" },
    { id: 343, category: "Kenton West" },
    { id: 344, category: "Kew" },
    { id: 345, category: "Kidbrooke with Hornfair" },
    { id: 346, category: "Kilburn" },
    { id: 347, category: "King's Cross" },
    { id: 348, category: "King's Park" },
    { id: 349, category: "Kingston" },
    { id: 350, category: "Knight's Hill" },
    { id: 351, category: "Knightsbridge & Belgravia" },
    { id: 352, category: "Lady Margaret" },
    { id: 353, category: "Ladywell" },
    { id: 354, category: "Lambeth" },
    { id: 355, category: "Lancaster Gate" },
    { id: 356, category: "Lansbury" },
    { id: 357, category: "Larkhall" },
    { id: 358, category: "Larkswood" },
    { id: 359, category: "Latchmere" },
    { id: 360, category: "Lavender Fields" },
    { id: 361, category: "Lea Bridge" },
    { id: 362, category: "Lee Green" },
    { id: 363, category: "Lewisham" },
    { id: 364, category: "Lewisham Central" },
    { id: 365, category: "Leyton" },
    { id: 366, category: "Leytonstone" },
    { id: 367, category: "Limehouse" },
    { id: 368, category: "Little Ilford" },
    { id: 369, category: "Little Venice" },
    { id: 370, category: "London Bridge & West Bermondsey" },
    { id: 371, category: "London Fields" },
    { id: 372, category: "Longbridge" },
    { id: 373, category: "Longlands" },
    { id: 374, category: "Longthornton" },
    { id: 375, category: "Lower Edmonton" },
    { id: 376, category: "Lower Morden" },
    { id: 377, category: "Loxford" },
    { id: 378, category: "Maida Vale" },
    { id: 379, category: "Manor" },
    { id: 380, category: "Manor Park" },
    { id: 381, category: "Mapesbury" },
    { id: 382, category: "Markhouse" },
    { id: 383, category: "Marlborough" },
    { id: 384, category: "Marylebone High Street" },
    { id: 385, category: "Mawneys" },
    { id: 386, category: "Mayesbrook" },
    { id: 387, category: "Mayfield" },
    { id: 388, category: "Merton" },
    { id: 389, category: "Merton Park" },
    { id: 390, category: "Middle Park & Sutcliffe" },
    { id: 391, category: "Mildmay" },
    { id: 392, category: "Mile End" },
    { id: 393, category: "Mill Hill" },
    { id: 394, category: "Monkhams" },
    { id: 395, category: "Mortlake & Barnes Common" },
    { id: 396, category: "Mottingham & Chislehurst North" },
    { id: 397, category: "Munster" },
    { id: 398, category: "Muswell Hill" },
    { id: 399, category: "New Addington North" },
    { id: 400, category: "New Addington South" },
    { id: 401, category: "New Cross" },
    { id: 402, category: "Newbury" },
    { id: 403, category: "Newham" },
    { id: 404, category: "Newington" },
    { id: 405, category: "Nightingale" },
    { id: 406, category: "Noel Park" },
    { id: 407, category: "Nonsuch" },
    { id: 408, category: "Norbiton" },
    { id: 409, category: "Norbury" },
    { id: 410, category: "Norbury & Pollards Hill" },
    { id: 411, category: "Norbury Park" },
    { id: 412, category: "Norland" },
    { id: 413, category: "North Bermondsey" },
    { id: 414, category: "North End" },
    { id: 415, category: "North Greenford" },
    { id: 416, category: "North Richmond" },
    { id: 417, category: "North Walworth" },
    { id: 418, category: "Northcote" },
    { id: 419, category: "Northfield" },
    { id: 420, category: "Northolt" },
    { id: 421, category: "Northolt Mandeville" },
    { id: 422, category: "Northolt West End" },
    { id: 423, category: "Northumberland Heath" },
    { id: 424, category: "Northumberland Park" },
    { id: 425, category: "Northwick Park" },
    { id: 426, category: "Northwood" },
    { id: 427, category: "Northwood Hills" },
    { id: 428, category: "Norwood Green" },
    { id: 429, category: "Notting Dale" },
    { id: 430, category: "Notting Hill" },
    { id: 431, category: "Nunhead & Queen's Road"},
    { id: 432, category: "Oakleigh" },
    { id: 433, category: "Old Coulsdon" },
    { id: 434, category: "Old Kent Road" },
    { id: 435, category: "Old Malden" },
    { id: 436, category: "Orpington" },
    { id: 437, category: "Osterley & Spring Grove" },
    { id: 438, category: "Oval" },
    { id: 439, category: "Palace Riverside" },
    { id: 440, category: "Palmers Green" },
    { id: 441, category: "Park Hill & Whitgift" },
    { id: 442, category: "Parsloes" },
    { id: 443, category: "Parsons Green" },
    { id: 444, category: "Parsons Green & Walham" },
    { id: 445, category: "Peckham" },
    { id: 446, category: "Peckham Rye" },
    { id: 447, category: "Pembridge" },
    { id: 448, category: "Penge & Cator" },
    { id: 449, category: "Peninsula" },
    { id: 450, category: "Perivale" },
    { id: 451, category: "Perry Vale" },
    { id: 452, category: "Pettits" },
    { id: 453, category: "Petts Wood & Knoll" },
    { id: 454, category: "Pinkwell" },
    { id: 455, category: "Pinner" },
    { id: 456, category: "Pinner South" },
    { id: 457, category: "Plaistow & Sundridge" },
    { id: 458, category: "Plaistow North" },
    { id: 459, category: "Plaistow South" },
    { id: 460, category: "Plumstead" },
    { id: 461, category: "Pollards Hill" },
    { id: 462, category: "Ponders End" },
    { id: 463, category: "Poplar" },
    { id: 464, category: "Preston" },
    { id: 465, category: "Prince's" },
    { id: 466, category: "Purley & Woodcote" },
    { id: 467, category: "Purley Oaks & Riddlesdown" },
    { id: 468, category: "Putney" },
    { id: 469, category: "Queen's Gate" },
    { id: 470, category: "Queen's Park" },
    { id: 471, category: "Queens Park" },
    { id: 472, category: "Queensbury" },
    { id: 473, category: "Queenstown" },
    { id: 474, category: "Rainham & Wennington" },
    { id: 475, category: "Ravensbury" },
    { id: 476, category: "Ravenscourt Park" },
    { id: 477, category: "Rayners Lane" },
    { id: 478, category: "Raynes Park" },
    { id: 479, category: "Redbridge" },
    { id: 480, category: "Redcliffe" },
    { id: 481, category: "Regent's Park" },
    { id: 482, category: "Richmond" },
    { id: 483, category: "River" },
    { id: 484, category: "Roehampton & Putney Heath" },
    { id: 485, category: "Romford" },
    { id: 486, category: "Rotherhithe" },
    { id: 487, category: "Roxbourne" },
    { id: 488, category: "Roxeth" },
    { id: 489, category: "Royal Docks" },
    { id: 490, category: "Royal Hospital" },
    { id: 491, category: "Ruislip" },
    { id: 492, category: "Rushey Green" },
    { id: 493, category: "Rye Lane" },
    { id: 494, category: "Sanderstead" },
    { id: 495, category: "Sands End" },
    { id: 496, category: "Selhurst" },
    { id: 497, category: "Selsdon & Addington Village" },
    { id: 498, category: "Selsdon Vale & Forestdale" },
    { id: 499, category: "Seven Kings" },
    { id: 500, category: "Seven Sisters" },
    { id: 501, category: "Shacklewell" },
    { id: 502, category: "Shadwell" },
    { id: 503, category: "Shaftesbury" },
    { id: 504, category: "Shepherd's Bush Green" },
    { id: 505, category: "Shirley North" },
    { id: 506, category: "Shirley South" },
    { id: 507, category: "Shooters Hill" },
    { id: 508, category: "Shortlands" },
    { id: 509, category: "Sidcup" },
    { id: 510, category: "Slade Green & Northend" },
    { id: 511, category: "South Acton" },
    { id: 512, category: "South Bermondsey" },
    { id: 513, category: "South Croydon" },
    { id: 514, category: "South Hornchurch" },
    { id: 515, category: "South Norwood" },
    { id: 516, category: "South Richmond" },
    { id: 517, category: "South Ruislip" },
    { id: 518, category: "South Twickenham" },
    { id: 519, category: "South Woodford" },
    { id: 520, category: "Southall Broadway" },
    { id: 521, category: "Southall Green" },
    { id: 522, category: "Southbury" },
    { id: 523, category: "Southfield" },
    { id: 524, category: "Southfields" },
    { id: 525, category: "Southgate" },
    { id: 526, category: "Southgate Green" },
    { id: 527, category: "Southwark" },
    { id: 528, category: "Spitalfields & Banglatown" },
    { id: 529, category: "Springfield" },
    { id: 530, category: "Squirrel's Heath" },
    { id: 531, category: "St Andrew's" },
    { id: 532, category: "St Ann's" },
    { id: 533, category: "St Dunstan's" },
    { id: 534, category: "St George's" },
    { id: 535, category: "St Giles" },
    { id: 536, category: "St Helier" },
    { id: 537, category: "St James" },
    { id: 538, category: "St James's" },
    { id: 539, category: "St Katharine's & Wapping" },
    { id: 540, category: "St Leonard's" },
    { id: 541, category: "St Margarets & North Twickenham" },
    { id: 542, category: "St Mark's" },
    { id: 543, category: "St Mary's" },
    { id: 544, category: "St Mary's & St James" },
    { id: 545, category: "St Mary's Park" },
    { id: 546, category: "St Pancras & Somers Town" },
    { id: 547, category: "St Peter's" },
    { id: 548, category: "St. Helen's" },
    { id: 549, category: "Stamford Hill West" },
    { id: 550, category: "Stanley" },
    { id: 551, category: "Stanmore Park" },
    { id: 552, category: "Stepney Green" },
    { id: 553, category: "Stockwell" },
    { id: 554, category: "Stoke Newington" },
    { id: 555, category: "Stonebridge" },
    { id: 556, category: "Stonecot" },
    { id: 557, category: "Stratford & New Town" },
    { id: 558, category: "Streatham" },
    { id: 559, category: "Streatham Hill" },
    { id: 560, category: "Streatham South" },
    { id: 561, category: "Streatham Wells" },
    { id: 562, category: "Stroud Green" },
    { id: 563, category: "Sudbury" },
    { id: 564, category: "Surbiton" },
    { id: 565, category: "Surbiton Hill" },
    { id: 566, category: "Surrey Docks" },
    { id: 567, category: "Sutton" },
    { id: 568, category: "Sutton Central" },
    { id: 569, category: "Sutton North" },
    { id: 570, category: "Sutton South" },
    { id: 571, category: "Sutton West" },
    { id: 572, category: "Swiss Cottage" },
    { id: 573, category: "Sydenham" },
    { id: 574, category: "Syon" },
    { id: 575, category: "Tachbrook" },
    { id: 576, category: "Teddington" },
    { id: 577, category: "Telegraph Hill" },
    { id: 578, category: "Thames" },
    { id: 579, category: "Thamesfield" },
    { id: 580, category: "Thamesmead East" },
    { id: 581, category: "Thamesmead Moorings" },
    { id: 582, category: "The Wrythe" },
    { id: 583, category: "Thornton" },
    { id: 584, category: "Thornton Heath" },
    { id: 585, category: "Thurlow Park" },
    { id: 586, category: "Tokyngton" },
    { id: 587, category: "Tollington" },
    { id: 588, category: "Tolworth & Hook Rise" },
    { id: 589, category: "Tooting" },
    { id: 590, category: "Tottenham Green" },
    { id: 591, category: "Tottenham Hale" },
    { id: 592, category: "Totteridge" },
    { id: 593, category: "Tower Hamlets" },
    { id: 594, category: "Town" },
    { id: 595, category: "Townfield" },
    { id: 596, category: "Trinity" },
    { id: 597, category: "Tudor" },
    { id: 598, category: "Tulse Hill" },
    { id: 599, category: "Turkey Street" },
    { id: 600, category: "Turnham Green" },
    { id: 601, category: "Twickenham" },
    { id: 602, category: "Twickenham Riverside" },
    { id: 603, category: "Underhill" },
    { id: 604, category: "Upminster" },
    { id: 605, category: "Upper Edmonton" },
    { id: 606, category: "Uxbridge" },
    { id: 607, category: "Uxbridge North" },
    { id: 608, category: "Uxbridge South" },
    { id: 609, category: "Valence" },
    { id: 610, category: "Valentines" },
    { id: 611, category: "Valley" },
    { id: 612, category: "Vassall" },
    { id: 613, category: "Victoria" },
    { id: 614, category: "Village" },
    { id: 615, category: "Vincent Square" },
    { id: 616, category: "Waddon" },
    { id: 617, category: "Wall End" },
    { id: 618, category: "Wallington North" },
    { id: 619, category: "Wallington South" },
    { id: 620, category: "Walpole" },
    { id: 621, category: "Waltham Forest" },
    { id: 622, category: "Walthamstow" },
    { id: 623, category: "Wandle Valley" },
    { id: 624, category: "Wandsworth" },
    { id: 625, category: "Wandsworth Common" },
    { id: 626, category: "Wanstead Park" },
    { id: 627, category: "Wanstead Village" },
    { id: 628, category: "Warwick" },
    { id: 629, category: "Watford" },
    { id: 630, category: "Wealdstone" },
    { id: 631, category: "Weavers" },
    { id: 632, category: "Welsh Harp" },
    { id: 633, category: "Wembley" },
    { id: 634, category: "Wembley Central" },
    { id: 635, category: "West Barnes" },
    { id: 636, category: "West Drayton" },
    { id: 637, category: "West End" },
    { id: 638, category: "West Finchley" },
    { id: 639, category: "West Green" },
    { id: 640, category: "West Ham" },
    { id: 641, category: "West Hampstead" },
    { id: 642, category: "West Harrow" },
    { id: 643, category: "West Heath" },
    { id: 644, category: "West Hendon" },
    { id: 645, category: "West Hill" },
    { id: 646, category: "West Putney" },
    { id: 647, category: "West Ruislip" },
    { id: 648, category: "West Thornton" },
    { id: 649, category: "West Twickenham" },
    { id: 650, category: "West Wickham" },
    { id: 651, category: "Westbourne" },
    { id: 652, category: "Whalebone" },
    { id: 653, category: "White Hart Lane" },
    { id: 654, category: "Whitechapel" },
    { id: 655, category: "Whitefoot" },
    { id: 656, category: "Whitton" },
    { id: 657, category: "Willesden Green" },
    { id: 658, category: "William Morris" },
    { id: 659, category: "Wimbledon" },
    { id: 660, category: "Wimbledon Park" },
    { id: 661, category: "Winchmore Hill" },
    { id: 662, category: "Wood Green" },
    { id: 663, category: "Wood Street" },
    { id: 664, category: "Woodberry Down" },
    { id: 665, category: "Woodhouse" },
    { id: 666, category: "Woodside" },
    { id: 667, category: "Woolwich Common" },
    { id: 668, category: "Woolwich Riverside" },
    { id: 669, category: "Worcester Park" },
    { id: 670, category: "Wormholt & White City" },
    { id: 671, category: "Yeading" },
    { id: 672, category: "Yiewsley" },

    { id: 673, category: "Abbey" },
    { id: 674, category: "Abbey Road" },
    { id: 675, category: "Abbey Wood" },
    { id: 676, category: "Abingdon" },
    { id: 677, category: "Acton Central" },
    { id: 678, category: "Addiscombe East" },
    { id: 679, category: "Addiscombe West" },
    { id: 680, category: "Addison" },
    { id: 681, category: "Aldborough" },
    { id: 682, category: "Alexandra" },
    { id: 683, category: "Alibon" },
    { id: 684, category: "Alperton" },
    { id: 685, category: "Angel" },
    { id: 686, category: "Askew" },
    { id: 687, category: "Avonmore & Brook Green" }

  ]
  const sampleLocations = [
    { id: "sl", category: "South London" },
    { id: "cl", category: "Central London" },
    { id: "nl", category: "North London" },
    { id: "el", category: "East London" },
    { id: "wl", category: "West London" },
    { id: "nel", category: "North East London" },
    { id: "nwl", category: "North West London" },
    { id: "swl", category: "South West London" },
    { id: "sel", category: "South East London" }
  ];
  allLocations.toSorted()

  const edinburghDistricts = [
    {
      id: 1,
      postcode: "EH1",
      category: "Edinburgh City Centre",
      addresses: [
        "1 Princes Street, Edinburgh, EH1 2EQ",
        "The Balmoral Hotel, 1 Princes Street, Edinburgh, EH1 2EQ",
        "Edinburgh Waverley Station, Edinburgh, EH1 1BQ"
      ]
    },
    {
      id: 2,
      postcode: "EH2",
      category: "New Town / City Centre",
      addresses: [
        "The Scotch Whisky Experience, 354 Castlehill, Edinburgh, EH2 4AE",
        "Assembly Rooms, 54 George Street, Edinburgh, EH2 2LR",
        "Harvey Nichols, 30-34 St Andrew Square, Edinburgh, EH2 2AD"
      ]
    },
    {
      id: 3,
      postcode: "EH3",
      category: "West End / Bruntsfield",
      addresses: [
        "The Royal College of Physicians, 9 Queen Street, Edinburgh, EH2 1JQ",
        "The Dome, 14 George Street, Edinburgh, EH2 2PF",
        "Tynecastle Park (Hearts FC), Gorgie Road, Edinburgh, EH11 2NL"
      ]
    },
    {
      id: 4,
      postcode: "EH4",
      category: "West Edinburgh (Murrayfield, Cramond, Davidson Mains)",
      addresses: [
        "Murrayfield Stadium, Roseburn Street, Edinburgh, EH12 5PJ",
        "Cramond Kirk, Cramond Glebe Road, Edinburgh, EH4 6NS",
        "Davidson Mains Park, 5 Quality Street, Edinburgh, EH4 5BP"
      ]
    },
    {
      id: 5,
      postcode: "EH5",
      category: "Trinity, Granton, Newhaven",
      addresses: [
        "Ocean Terminal, Ocean Drive, Edinburgh, EH6 6JJ",
        "Newhaven Harbour, 24 Pier Place, Edinburgh, EH6 4LP",
        "The Trinity Academy, Craighall Road, Edinburgh, EH6 4RT"
      ]
    },
    {
      id: 6,
      postcode: "EH6",
      category: "Leith",
      addresses: [
        "The Royal Yacht Britannia, Ocean Drive, Edinburgh, EH6 6JJ",
        "Leith Theatre, 28-30 Ferry Road, Edinburgh, EH6 4AE",
        "The Shore (Leith’s dining area), 1-3 Shore, Edinburgh, EH6 6QW"
      ]
    },
    {
      id: 7,
      postcode: "EH7",
      category: "Leith Walk, Easter Road, Calton Hill",
      addresses: [
        "Meadowbank Stadium, 200 London Road, Edinburgh, EH7 6AE",
        "Prestonfield House Hotel, Priestfield Road, Edinburgh, EH16 5UT",
        "The Edinburgh Playhouse, 18-22 Greenside Place, Edinburgh, EH1 3AA"
      ]
    },
    {
      id: 8,
      postcode: "EH8",
      category: "Holyrood, Old Town, University of Edinburgh",
      addresses: [
        "The Scottish Parliament, Holyrood, Edinburgh, EH99 1SP",
        "Dynamic Earth, Holyrood Road, Edinburgh, EH8 8AS",
        "University of Edinburgh Old College, South Bridge, Edinburgh, EH8 9YL"
      ]
    },
    {
      id: 9,
      postcode: "EH9",
      category: "Marchmont, Newington, Grange",
      addresses: [
        "The King’s Buildings (University of Edinburgh), Mayfield Road, Edinburgh, EH9 3JL",
        "Royal Commonwealth Pool, 21 Dalkeith Road, Edinburgh, EH16 5BB",
        "Prestonfield Golf Club, Priestfield Road, Edinburgh, EH16 5UT"
      ]
    },
    {
      id: 10,
      postcode: "EH10",
      category: "Morningside, Fairmilehead",
      addresses: [
        "Morningside Library, 184-192 Morningside Road, Edinburgh, EH10 4PD",
        "The Braid Hills Hotel, 134 Braid Road, Edinburgh, EH10 6JD",
        "Fairmilehead Parish Church, 1 Frogston Road West, Edinburgh, EH10 7AA"
      ]
    },
    {
      id: 11,
      postcode: "EH11",
      category: "Gorgie, Dalry, Shandon",
      addresses: [
        "Tynecastle Park (Heart of Midlothian FC), McLeod Street, Edinburgh, EH11 2NL",
        "Gorgie City Farm, 51 Gorgie Road, Edinburgh, EH11 2LA",
        "Dalry Swim Centre, 46 Dalry Road, Edinburgh, EH11 2AW"
      ]
    },
    {
      id: 12,
      postcode: "EH12",
      category: "Corstorphine, Murrayfield, West Coates",
      addresses: [
        "Edinburgh Zoo, 134 Corstorphine Road, Edinburgh, EH12 6TS",
        "Murrayfield Ice Rink, Riverside Crescent, Edinburgh, EH12 5XN",
        "Gyle Shopping Centre, 125 The Gyle Centre, Edinburgh, EH12 9JY"
      ]
    },
    {
      id: 13,
      postcode: "EH13",
      category: "Colinton, Juniper Green, Currie",
      addresses: [
        "Colinton Parish Church, 9 Bridge Road, Edinburgh, EH13 0LQ",
        "Currie Rugby Club, 32 Lanark Road West, Edinburgh, EH13 0PQ",
        "Juniper Green Bowling Club, 170 Lanark Road, Edinburgh, EH13 0DQ"
      ]
    },
    {
      id: 14,
      postcode: "EH14",
      category: "Balerno, Baberton, Wester Hailes",
      addresses: [
        "Balerno Parish Church, 2 Main Street, Balerno, Edinburgh, EH14 7EH",
        "Baberton Golf Club, 50 Baberton Avenue, Edinburgh, EH14 3DR",
        "Wester Hailes Library, 5 Westside Plaza, Edinburgh, EH14 2ST"
      ]
    },
    {
      id: 15,
      postcode: "EH15",
      category: "Portobello, Craigmillar, Joppa",
      addresses: [
        "Portobello Beach Promenade, Edinburgh, EH15 1DB",
        "Portobello Swim Centre, 57 The Promenade, Edinburgh, EH15 1DX",
        "Craigmillar Castle, Craigmillar Castle Road, Edinburgh, EH16 4SY"
      ]
    },
    {
      id: 16,
      postcode: "EH16",
      category: "Liberton, Gilmerton, Craigmillar",
      addresses: [
        "Liberton Kirk, 1 Kirkgate, Edinburgh, EH16 6RR",
        "Royal Infirmary of Edinburgh, 51 Little France Crescent, Edinburgh, EH16 4SA",
        "Gilmerton Community Centre, 4-6 Drum Street, Edinburgh, EH17 8QG"
      ]
    },
    {
      id: 17,
      postcode: "EH17",
      category: "Danderhall, Newcraighall, Edgefield",
      addresses: [
        "Danderhall Medical Centre, 1 Oak Lane, Danderhall, Edinburgh, EH16 4EX",
        "Newcraighall Parish Church, 1 Newcraighall Road, Edinburgh, EH21 8SF",
        "Edinburgh College (Milton Road Campus), 24 Milton Road East, Edinburgh, EH15 2PP"
      ]
    },
    {
      id: 18,
      postcode: "EH28",
      category: "Kirkliston, Newbridge, Ratho",
      addresses: [
        "Kirkliston Leisure Centre, 37 Station Road, Kirkliston, EH29 9AQ",
        "Ratho Park Golf Club, 7 Baird Road, Ratho, EH28 8RA",
        "Newbridge Industrial Estate, 1 Newbridge Industrial Estate, EH28 8PJ"
      ]
    },
    {
      id: 19,
      postcode: "EH29",
      category: "Kirkliston, Winchburgh",
      addresses: [
        "Kirkliston Primary School, The Loan, Kirkliston, EH29 9EB",
        "Winchburgh Community Centre, 6-8 High Street, Winchburgh, EH52 6HW",
        "Drumshoreland Garden Centre, 5 Drumshoreland Road, Kirkliston, EH29 9DU"
      ]
    },
    {
      id: 20,
      postcode: "EH30",
      category: "South Queensferry, Dalmeny",
      addresses: [
        "Forth Bridge, South Queensferry, EH30 9SF",
        "Dalmeny House, South Queensferry, EH30 9TQ",
        "Hopetoun Farm Shop, South Queensferry, EH30 9SL"
      ]
    },

    {
      id: 21,
      category: "Duddingston",
    },
    {
      id: 22,
      category: "East Craigs",
    },
    {
      id: 23,
      category: "Ferniehill",
    },
    {
      id: 24,
      category: "Gogar",
    },
    {
      id: 25,
      category: "Ingliston",
    },
    {
      id: 26,
      category: "Kaimes",
    },
    {
      id: 27,
      category: "Liberton (Greater)",
    },
    {
      id: 28,
      category: "Little France",
    },
    {
      id: 29,
      category: "Mayfield",
    },
    {
      id: 30,
      category: "Moredun",
    },
    {
      id: 31,
      category: "King's Knowe",
    },
    {
      id: 32,
      category: "Muirhouse",
    },
    {
      id: 33,
      category: "Oxgangs",
    },
    {
      id: 34,
      category: "Pentland Hills",
    },
    {
      id: 35,
      category: "Ratho Station",
    },
    {
      id: 36,
      category: "Sighthill",
    },
    {
      id: 37,
      category: "Slateford",
    },
    {
      id: 38,
      category: "Swanston",
    },
    {
      id: 39,
      category: "The Inch",
    },

    {
      id: 40,
      postcode: "EH18",
      category: "Lasswade",
      addresses: [
        "Lasswade High School, Eskdale Drive, Lasswade, EH18 1PB",
        "Danderhall Medical Centre, 1 Oak Lane, Danderhall, EH18 1BU",
        "Polton Mill, Lasswade Road, EH18 1PP"
      ]
    },
    {
      id: 41,
      postcode: "EH19",
      category: "Bonnyrigg",
      addresses: [
        "Bonnyrigg Town Hall, High Street, Bonnyrigg, EH19 2AE",
        "Lochrin Kennels, 22 Broomieknowe, Bonnyrigg, EH19 2JG",
        "Newbattle Abbey College, Newbattle Road, EH19 3JA"
      ]
    },
    {
      id: 42,
      postcode: "EH20",
      category: "Loanhead",
      addresses: [
        "Loanhead Leisure Centre, Clerk Street, Loanhead, EH20 9DR",
        "IKEA Edinburgh, Straiton Retail Park, EH20 9PW",
        "Pentland Hills Regional Park, EH20 9QZ"
      ]
    },
    {
      id: 43,
      postcode: "EH21",
      category: "Musselburgh",
      addresses: [
        "Musselburgh Racecourse, Linkfield Road, EH21 7RG",
        "The Brunton Theatre, Ladywell Way, EH21 6AA",
        "Musselburgh Golf Club, Monktonhall, EH21 6SW"
      ]
    },
    {
      id: 44,
      postcode: "EH22",
      category: "Dalkeith",
      addresses: [
        "Dalkeith Country Park, EH22 2NA",
        "St David's RC High School, Cousland Road, EH22 2PS",
        "Eskmills Railway Station, EH22 1AG"
      ]
    },
    {
      id: 45,
      postcode: "EH23",
      category: "Gorebridge",
      addresses: [
        "Gorebridge Leisure Centre, Hunterfield Road, EH23 4TT",
        "Arniston House, Gorebridge, EH23 4RY",
        "Newtongrange Railway Station, EH23 4LF"
      ]
    },
    {
      id: 46,
      postcode: "EH24",
      category: "Roslin",
      addresses: [
        "Rosslyn Chapel, Chapel Loan, EH25 9PU",
        "Roslin Institute, EH25 9RG",
        "Bilston Glen Industrial Estate, EH25 9SP"
      ]
    },
    {
      id: 47,
      postcode: "EH25",
      category: "Roslin",
      addresses: [
        "Roslyn Glen Country Park, EH25 9LX",
        "Eskview Medical Centre, 1 Eskview Terrace, EH25 9JA",
        "Roslin War Memorial, EH25 9PX"
      ]
    },
    {
      id: 48,
      postcode: "EH26",
      category: "Easter Bush",
      addresses: [
        "The Royal (Dick) School of Veterinary Studies, EH25 9RG",
        "Bush House, Easter Bush Campus, EH25 9RG",
        "Pentland Hills Walking Routes, EH26 0PJ"
      ]
    },
    {
      id: 49,
      postcode: "EH27",
      category: "Kirknewton",
      addresses: [
        "Kirknewton War Memorial, EH27 8DA",
        "East Calder Library, Langton Road, EH27 8DQ",
        "Harperrig Reservoir, EH27 8DN"
      ]
    },
       // council
    { id: 50, category: "Midlothian", type: "Council Area", notable: "Local government region south of Edinburgh" },
    { id: 53, category: "Penicuik", type: "Town", notable: "Former paper-mill town near Pentland Hills" },
    { id: 54, category: "Loanhead", type: "Town", notable: "Home to Straiton Retail Park" },
    { id: 56, category: "Newtongrange", type: "Village", notable: "National Mining Museum Scotland" },
    { id: 58, category: "Bilston", type: "Village", notable: "Bilston Glen Viaduct" },
    { id: 59, category: "Lasswade", type: "Village", notable: "Polton Mill and scenic river walks" },

    // Villages (IDs 60-79)
    { id: 60, category: "Mayfield", type: "Village", notable: "Post-war residential development" },
    { id: 61, category: "Eskbank", type: "Village", notable: "Eskbank Railway Station (heritage line)" },
    { id: 62, category: "Auchendinny", type: "Village", notable: "18th-century paper mill ruins" },
    { id: 63, category: "Temple", type: "Village", notable: "Knights Templar connections" },
    { id: 64, category: "Carrington", type: "Village", notable: "Rural farmland and Carrington Church" },
    { id: 65, category: "Rosewell", type: "Village", notable: "Roslin Glen Country Park access" },
    { id: 66, category: "Pathhead", type: "Village", notable: "Pathhead Sands and Prestonhall Estate" },
    { id: 67, category: "Fushiebridge", type: "Hamlet", notable: "Fushiebridge Inn and Fala Flow" },
    { id: 68, category: "North Middleton", type: "Village", notable: "Middleton Limeworks" },
    { id: 69, category: "Glencreg", type: "Hamlet", notable: "Glencreg House" },
    { id: 70, category: "Howgate", type: "Hamlet", notable: "Howgate Inn (historic coaching stop)" },
    { id: 71, category: "Edinburgh Airport", type: "Area", notable: "Technically in West Lothian but serves Midlothian" },
    { id: 72, category: "Borthwick", type: "Village", notable: "Borthwick Castle (15th-century fortress)" },
    { id: 73, category: "Crichton", type: "Village", notable: "Crichton Collegiate Church" },
    { id: 74, category: "Vogrie", type: "Hamlet", notable: "Vogrie Country Park" },
    { id: 75, category: "Tynewater", type: "Village", notable: "Tyneholm Farm" },
    { id: 76, category: "Newlandrig", type: "Hamlet", notable: "Small farming community" },
    { id: 77, category: "Edgehead", type: "Village", notable: "Near A68 scenic route" },
    { id: 78, category: "Tynedale", type: "Area", notable: "Tyne Valley walks" },
    { id: 79, category: "Fala", type: "Village", notable: "Fala Flow moorland" },

    // Historical/Outlying Areas (IDs 80-99)
    { id: 80, category: "Arniston", type: "Estate", notable: "Arniston House (historic mansion)" },
    { id: 81, category: "Prestonhall", type: "Estate", notable: "Prestonhall House" },
    { id: 82, category: "Polton", type: "Village", notable: "Polton Mill and River North Esk" },
    { id: 83, category: "Temple Kirk", type: "Ruins", notable: "Medieval church ruins" },
    { id: 84, category: "Birkenside", type: "Hamlet", notable: "Birkenside House" },
    { id: 85, category: "Sheriffhall", type: "Junction", notable: "Major road interchange" },
    { id: 86, category: "Smeaton", type: "Hamlet", notable: "Smeaton House" },
    { id: 87, category: "Easter Howgate", type: "Hamlet", notable: "Near Howgate Inn" },
    { id: 88, category: "Oatslie", type: "Area", notable: "Residential part of Penicuik" },
    { id: 89, category: "Hillend", type: "Area", notable: "Hillend Ski Centre (Pentlands)" },
    { id: 90, category: "Nine Mile Burn", type: "Hamlet", notable: "Scenic stop on A702" },
    { id: 91, category: "Silverburn", type: "Park", notable: "Silverburn Park in Penicuik" },
    { id: 92, category: "Glencorse", type: "Area", notable: "Glencorse Barracks" },
    { id: 93, category: "Mortonhall", type: "Estate", notable: "Mortonhall Caravan Park" },
    { id: 94, category: "Gowkley Moss", type: "Landmark", notable: "Peatland area" },
    { id: 95, category: "Cauldcoats", type: "Hamlet", notable: "Near Gorebridge" },
    { id: 96, category: "Ford", type: "Hamlet", notable: "Fordel Hill" },
    { id: 97, category: "Salters Road", type: "Area", notable: "Industrial zone in Dalkeith" },
    { id: 98, category: "Eldindean", type: "Farm", notable: "Rural farmland" },
    { id: 99, category: "Glenholm", type: "Valley", notable: "Remote glen in Pentlands"}

  ];
  const edinburghLocations = [
    {
      id: 3,
      category: "Portobello",
    },
    {
      id: 4,
      category: "Morningside",
    },
    {
      id: 5,
      category: "Cramond",
    },
    {
      id: 6,
      category: "Stockbridge",
    },
    {
      id: 31,
      category: "Bingham",
    },
    {
      id: 32,
      category: "Blackhall",
    },
    {
      id: 33,
      category: "Bonaly",
    },
    {
      id: 34,
      category: "Burghmuirhead",
    },
    {
      id: 40,
      category: "West Pilton",
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
          location.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h4 style={{ color:'blue', maxWidth:'500px', textAlign:'justify', marginTop:'10px', backgroundColor:'transparent'}}>
              Get professional home and office cleaning in Edinburgh and the surrounding areas. Search for a local cleaner,
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
                              <Link to="/city" state={{ id: location.id, category: location.category }}>
                                {location.category}
                              </Link>
                            </h3>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="no-results">
                    <p>No Cleaner was found in this location</p>
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
                              <Link to="/city"  state={{ id: location.id, category: location.category }}>
                                {location.category}
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