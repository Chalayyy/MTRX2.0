export type Mtrx = {
    date: Date;
    theme: string;
    clueRows: Row[];
};

export type Row = {
    clue: object;
    solution: "string";
};