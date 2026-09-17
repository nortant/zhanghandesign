# S3 Wolfe Park - Concept A: design QA report

Portfolio sample by a fictitious firm (Bow Ridge Geomatics & Landscape). Not for construction.

Checks re-measured from the final geometry and proposed surface: **36** - EXCEPTION 2, OPEN 1, PASS 29, REVIEW 2, RFI 2

Status: PASS meets the criterion; PASS (TREATED) meets it through a noted design measure; EXCEPTION documented deviation; RFI needs an answer from the City; REVIEW minor, fix in detailing; OPEN must be resolved before issue for construction.

## Pathway

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| A1-loop | running slope loop | design profile max 3.9%; surface max 3.9% (2 m baseline), 0 m over 4% | <= 4% (1:25 sloping walk) | **PASS** | ADS p15; project target | 1 m spot readings on the 0.25 m surface raster peak at 4.1% |
| A1-E1 | running slope E1 | design profile max 3.8%; surface max 3.9% (2 m baseline), 0 m over 4% | <= 4% (1:25 sloping walk) | **PASS** | ADS p15; project target | 1 m spot readings on the 0.25 m surface raster peak at 4.0% |
| A1-E2 | running slope E2 | design profile max 10.3%; surface max 10.3% (2 m baseline), 18 m over 4% | <= 4% (1:25 sloping walk) | **EXCEPTION** | ADS p15; project target | RFI-2: roots under drip line prevent lowering; 1 m spot readings on the 0.25 m surface raster peak at 10.8% |
| A1-E3 | running slope E3 | design profile max 6.9%; surface max 6.9% (2 m baseline), 14 m over 4% | <= 4% (1:25 sloping walk) | **EXCEPTION** | ADS p15; project target | RFI-2: roots under drip line prevent lowering; 1 m spot readings on the 0.25 m surface raster peak at 7.0% |
| A1-E4 | running slope E4 | design profile max 3.8%; surface max 3.9% (2 m baseline), 0 m over 4% | <= 4% (1:25 sloping walk) | **PASS** | ADS p15; project target | 1 m spot readings on the 0.25 m surface raster peak at 4.0% |
| A2 | cross slope (sampled +/-1.0 m every 5 m) | median 2.00%, 94% of samples within 1.5-2.5% | 2% one-way (<= 2% ADS) | **PASS** | DGSS p128 6.1.3.4(3); ADS p15 | raster interpolation at 0.25 m smooths the pavement edge |
| A3 | trapped lows on or next to the path | 1 (39 mm / 1.1 m2) | none | **OPEN** | DGSS p128 6.1.3.4(3) | at a TPZ edge restraint; resolve with a weep gap / local regrade in detailing |
| A4 | junction angle spur/loop | E1 79 deg, E2 83 deg, E3 90 deg, E4 69 deg | >= 60 deg (90 preferred) | **PASS** | DGSS p122-123 6.1.2 |  |
| A5 | entrance angle to street edge | E1 84 deg, E2 77 deg, E3 90 deg, E4 82 deg | >= 75 deg (90 preferred) | **PASS** | DGSS p122-123 6.1.2 |  |
| A6 | overhead clearance under crowns | 14 trees over path | >= 3.0 m | **RFI** | DGSS p122 6.1.2.2(2) | tree heights not surveyed (RFI-6) |

## Trees

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| B1 | pavement (2.5 m) inside any 4 m TPZ | 0.00 m2 | 0 | **PASS** | DGSS p85 4.1.6(1) |  |
| B2 | granular shoulder inside a 4 m TPZ | 0.33 m2 at 4 trees | 0 or treated | **PASS (TREATED)** | DGSS p85 4.1.6(1) | shoulder omitted there, flush edge restraint (L-101 note 6) |
| B3 | grading limit inside 4 m TPZ | 2.34 m2 (raster pixel overhang) | 0 graded cells | **PASS** | DGSS p86 4.1.6(3)(g) |  |
| B4 | no-dig build-up at stations under drip lines (centreline) | min 109 mm over 115 stations | >= 100 mm above highest ground across path | **PASS** | project decision (RFI-3) |  |
| B5 | barrier fence encloses the full 4 m TPZ of every inventory tree | 61 / 61 | all | **PASS** | TPP Guide 2025 p2 |  |
| B6 | trees removed | 0 | removal only as last resort | **PASS** | TPP Guide 2025 p2 |  |
| B7 | staging area outside all drip lines | 0.00 m2 overlap | 0 | **PASS** | DGSS p86 4.1.6(3)(d) |  |

## Drainage

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| C1 | rain garden base level (inside base) | range 0 mm | flat, <= 1% | **PASS** | LID-M2 p2-23 |  |
| C2 | rain garden ponding depth | 200 mm | 200 mm standard, 300 practical max | **PASS** | LID-M2 p2-5 |  |
| C3 | overflow route crosses a path | False | no | **PASS** | DGSS p128 6.1.3.4(4) |  |
| C4 | concentrated flow >= 1000 m2 crossing a path has a culvert | 1 crossing(s), 1 culvert(s) | all | **PASS** | DGSS p128 6.1.3.4(4) | sizing RFI-4 |
| C5 | graded turf steeper than 3:1 | 4.88 m2 | 0 (3:1 max) | **REVIEW** | DGSS Detail 35 | local cells where daylight meets a TPZ at 3:1 plus raster edge effects |
| C6 | graded turf flatter than 1% | 18.25 m2 | min 2% gradient | **REVIEW** | DGSS p99 5.1.2.1(1) | includes filled lows (fill to spill + 5 mm); fine-grade to 2% in detailing |

## Planting

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| D1 | park tree count after planting | 145 (39.8/0.405 ha) | 73-145 | **PASS** | DGSS p34 Table 1-2 |  |
| D2 | new trees: distinct genera | Tilia, Gleditsia, Aesculus, Pinus, Larix | <= 15% any genus (community scale) | **PASS** | DGSS p81 4.1.1(4) | existing Picea 21%, Fraxinus 16% not increased |
| D3 | tree hardiness zones | TA 3, GT 3b, AG 3, CM 3b, PP 3a, LS 2 | <= 4a (site) | **PASS** | DGSS Table 4-1; NRCan PHZ 2025 |  |
| D4 | new tree setbacks re-measured (hard surface incl. shoulder, drip lines, sight lines) | 5 / 5 clear | 1/2 spread deciduous, 2 m conifer; outside drip lines; outside 5 m sight zones | **PASS** | DGSS p83 Table 4-3; p123 6.1.2.5 |  |
| D5 | shrub bed area | 177 m2 | 74-222 m2 | **PASS** | DGSS p34 Table 1-2 |  |
| D6 | planting beds / trees in 5 m sight-line zones | 0.00 m2 beds | 0 | **PASS** | DGSS p123 6.1.2.5 |  |

## Access

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| E1 | barrier-free route street -> loop -> seating node | via E1 and E4 (<= 4%) | at least one step-free route | **PASS** | ADS p15 | E2/E3 not barrier-free (RFI-2) |
| E2 | bench seat height | 450 mm | DGSS 410-440 vs ADS 450-500 | **RFI** | DGSS p157; ADS p13 | RFI-1 |
| E3 | benches per site (existing + new) | 3 + 1 = 4 | 1-5 | **PASS** | DGSS p34 Table 1-2 |  |
| E4 | waste receptacle | 1 new; 37.3 m from nearest bench; 1.1 m from path edge | 1 per site, near walkways not benches; >= 10 m from benches | **PASS** | DGSS p34 Table 1-2; p157 7.4.3.2(3)(d) |  |

## Existing

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| F1 | conflicts with existing benches, slabs, sign, light standard (< 1.0 m) | 0 conflict(s) | none; 1.0 m from vertical obstacles | **PASS** | DGSS p122 6.1.2.2; site survey V-101 |  |

## Drawings

| ID | Check | Result | Criterion | Status | Source | Note |
|---|---|---|---|---|---|---|
| G1 | sheets produced | L-001, L-101, L-201, L-301, L-401, L-501 | L-001, L-101, L-201, L-301, L-401, L-501 | **PASS** | S3 scope |  |
| G2 | ezdxf audit errors / watermark / sheet number in title block | 0 errors; watermark True; title blocks True | 0 / all / all | **PASS** | Bow Ridge CAD standard; legal-drawing rule |  |

## Quantities (neat, no allowances)

| Div. | Item | Qty | Unit |
|---|---|---|---|
| Site preparation | Tree protection fence 1.2 m (Detail 4) | 1181.7 | m |
| Site preparation | Tree protection warning signs (1 per 10 m of fence, min 1 per enclosure) | 131 | ea |
| Site preparation | Ground protection mats under drip lines | 90.5 | m2 |
| Site preparation | Staging area set-up and restoration | 135.0 | m2 |
| Earthworks | Cut (neat) | 51.6 | m3 |
| Earthworks | Fill (neat) | 111.1 | m3 |
| Earthworks | Net import | 59.6 | m3 |
| Pathways | Asphalt pathway 2.5 m, 75 mm City Mix B (Detail 1) | 1144.9 | m2 |
| Pathways | Asphalt (75 mm), volume | 85.9 | m3 |
| Pathways | 25 mm crushed gravel base 100 mm incl. shoulders | 128.2 | m3 |
| Pathways | Pathway centreline length | 459.3 | m |
| Pathways | No-dig construction: geotextile (Detail 2) | 295.1 | m2 |
| Pathways | Root-friendly edge restraint (no-dig edges both sides + TPZ edges) | 218.0 | m |
| Pathways | Culvert under pathway (DGSS Detail 38, size RFI-4) | 1 | ea |
| Site furniture | Concrete seating pad (Detail 6) | 28.2 | m2 |
| Site furniture | Bench 1.8 m with back and armrests | 1 | ea |
| Site furniture | Waste receptacle (City standard) on 1.5 x 1.5 m concrete pad | 1 | ea |
| Site furniture | Protect existing memorial benches in place | 3 | ea |
| Rain garden | Bioretention growing media 450 mm | 31.2 | m3 |
| Rain garden | Plugs 300 mm o.c. | 1218 | ea |
| Rain garden | Overflow splash pad at outfall (DGSS Detail 46) | 1 | ea |
| Planting | Deciduous trees 60 mm cal. WB | 3 | ea |
| Planting | Coniferous trees 2.0 m WB | 2 | ea |
| Planting | Shrubs #2 container | 38 | ea |
| Planting | Shrub bed topsoil 600 mm | 106.4 | m3 |
| Planting | Shredded wood mulch 75 mm (beds + 1.0 m tree wells) | 13.6 | m3 |
| Turf restoration | Topsoil 125 mm + sod on disturbed turf | 1247.9 | m2 |
| Turf restoration | Topsoil 125 mm, volume | 156.0 | m3 |
