export interface SearchHit {
    _score  : number;
    _source : {
        title           : string;
        body            : string;
        Epigrafe        : string;
        Year            : string;
        Numero          : string,
        Tipo            : string;
        Entidad         : string;
        "Sigla-Entidad" : string;
        Nombre          : string;
        NombreEpigrafe  : string;
    };

}

export interface SearchBarProps {
    value         : string;
    onChange      : (value: string) => void;
    onSubmit?     : () => void;
    onOpenFilters : () => void;
    placeholder?  : string;
    filterActive? : boolean;
}

export interface SearchResultsProps {
  results : SearchHit[];
  visible : boolean;
};

export interface SearchFilters {
  must     : string[];
  should   : string[];
  yearFrom : string;
  yearTo   : string;
}

export interface ModalProps {
  open     : boolean;
  onSave   : () => void;
  onCancel : () => void;
  children : React.ReactNode;
}

export interface FilterYearsProps {
  yearFrom         : string;
  yearTo           : string;
  onChangeyearFrom : (value: string) => void;
  onChangeyearTo   : (value: string) => void;
}

export interface FilterTextProps {
  value    : string[];
  onChange : (value: string) => void;
  clear    : () => void;
  label    : string;
}

export interface ResultsModalProps {
  open     : boolean;
  onClose  : () => void;
  onRender : () => void;
  children : React.ReactNode;
}

export interface LoaderProps {
    visible : boolean;
}