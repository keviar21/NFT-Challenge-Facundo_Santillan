import { FilterOption, FilterDropdown, FilterRange, ListingFilters } from "./interfaces/filters";

//HOME

export const HeaderOptionsDefault = [
  {
    label: "Discover",
    value: "discover",
    link: "/",
    externalLink: false
  },
  {
    label: "What we do",
    value: "what-we-do",
    link: "/",
    externalLink: false
  }
]

export const HeaderButtonsDefault = [
  {
    label: "Connect Wallet",
    value: "connect-wallet",
    link: "/",
    type: "primary-button"
  }
]

export const ExploreDefault = {
eyebrow: "Create, explore, & SELL digital art NFTs.",
title: "The new creative economy.",
ctaText: "Explore"
}

//LISTING

export const defaultOrderBy = [
    {
      label: "Newest",
      value: "newest"
    },
    {
      label: "Oldest",
      value: "oldest"
    }
]
  
export const defaultTopFilters: FilterOption[] = [
    {
      label: "All items",
      value: "all-items"
    },
    {
      label: "Art",
      value: "art"
    },
    {
      label: "Photography",
      value: "photography"
    }
]
  
export const defaultFiltersRange: FilterRange[] = [
    {
      title: "Price Range",
      value: "instantPrice",
      enabled: true,
      minVal: 0.000,
      maxVal: 12,
      currency: "ETH"
    }
]
  
export const defaultFiltersDropdown: FilterDropdown[] = [
    {
      title: "Likes",
      value: "likes",
      enabled: true,
      options: [
        {
          label: "Most Laked",
          value: "most-laked",
          image: "like.svg"
        },
        {
          label: "Least Laked",
          value: "least-laked",
          image: "dislike.svg"
        }
      ]
    },
    {
      title: "Colors",
      value: "colors",
      enabled: true,
      options: [
        {
          label: "All colors",
          value: "all-colors",
          color: "all"
        },
        {
          label: "Orange",
          value: "orange",
          color: "#ffa500"
        },
        {
          label: "Pink",
          value: "pink",
          color: "#EF466F"
        },
        {
          label: "Purple",
          value: "purple",
          color: "#9757D7"
        }
      ]
    }
]

export const defaultFilters: ListingFilters = {
  instantPrice: "12",
  type: "All items",
  color: "all-colors",
  rarity: ""
}

//PRODUCT

export const defaultTitle = "The creator network®";
export const defaultCardTitle = "Amazing art";
export const defaultPhoto = "./images/no_image.jpg";
export const defaultAvatar = "./images/no_author.png";