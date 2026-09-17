import s1 from './s1_metrics.json';
import s3 from './s3_metrics.json';

export type ProjectStatus = 'ready' | 'planned';

export interface ProjectSummary {
  id: string;
  title: string;
  targetRole: string;
  status: ProjectStatus;
  href?: string;
  summary: string;
}

export const projects: ProjectSummary[] = [
  {
    id: 'S1',
    title: 'Topographic survey to base plan',
    targetRole: 'Survey CAD / Geomatics Technician',
    status: 'ready',
    href: '/projects/s1-topographic-survey/',
    summary: `${s1.field.records.toLocaleString()} field shots checked, linework and TIN built, 1:500 topographic plan issued as DWG/PDF.`,
  },
  {
    id: 'S2a',
    title: 'Real Property Report (RPR) sample',
    targetRole: 'Survey CAD Technician (Alberta residential)',
    status: 'planned',
    summary: 'Building and fence positions relative to property lines, setback compliance check.',
  },
  {
    id: 'S2b',
    title: 'Wellsite survey plan sample',
    targetRole: 'Survey CAD Technician (energy sector)',
    status: 'planned',
    summary: 'Well centre, lease boundary and access road on the Alberta Township System.',
  },
  {
    id: 'S3',
    title: 'Landscape construction drawings',
    targetRole: 'Landscape Architectural Technician',
    status: 'ready',
    href: '/projects/s3-landscape-construction/',
    summary: `Concept A for Wolfe Park: ${s3.path.loop_m} m accessible loop, rain garden and planting on six ARCH D sheets; ${s3.trees.removals} trees removed, ${s3.qa.status.PASS} of ${s3.qa.total} QA checks passed.`,
  },
  {
    id: 'S4',
    title: 'LiDAR to DEM accuracy assessment',
    targetRole: 'Geomatics Technician',
    status: 'planned',
    summary: 'Ground classification of public LiDAR compared with the source classification, and an accuracy report against check points.',
  },
  {
    id: 'S5',
    title: 'GIS site analysis',
    targetRole: 'GIS Technician',
    status: 'planned',
    summary: 'Slope, drainage, tree canopy and land-use analysis map set.',
  },
];
