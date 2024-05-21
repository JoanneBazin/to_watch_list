export interface Item {
  title: string;
  synopsis: string | null;
  year: number | null;
  real: string | null;
  platform: string | null;
  categoryName: string;
  id: number;
}

export interface CategoryProps {
  name: string;
  id: number;
}
