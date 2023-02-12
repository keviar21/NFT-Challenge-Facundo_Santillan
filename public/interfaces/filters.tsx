export interface FilterOption {
    label: string,
    value: string,
    image?: string,
    color?: string,
  }
  
export interface FilterDropdown {
    title: string,
    value: string,
    enabled: boolean,
    options: FilterOption[]
}

export interface FilterRange {
    title: string,
    value: string,
    enabled: boolean,
    minVal: number,
    maxVal: number,
    currency: string,
}

export interface ListingFilters {
    instantPrice: string,
    type: string,
    color: string,
    rarity: string
}
