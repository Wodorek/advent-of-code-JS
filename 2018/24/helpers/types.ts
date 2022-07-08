export interface IUnit {
  type: string;
  count: number;
  unitHp: number;
  deals: string;
  dmgAmount: number;
  initiative: number;

  damageTypes: {
    immune: string[];
    weak: string[];
  };
}
