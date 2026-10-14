import type { HarvestListing } from './mockData'
import type { ListingStatus } from '../../types/status'

export interface HarvestFilterParams {
  searchKeyword?: string
  selectedProvince?: string
  selectedHarvestWindow?: string
  selectedStatus?: ListingStatus | 'ALL'
  sortBy?: 'EARLIEST_HARVEST' | 'QUANTITY_DESC' | 'QUANTITY_ASC'
}

/**
 * Pure filter and sort function for harvest listings.
 * Enforces BR-031, BR-032 (same result set between list view and map view).
 */
export function filterHarvestListings(
  listings: HarvestListing[],
  params: HarvestFilterParams
): HarvestListing[] {
  const {
    searchKeyword = '',
    selectedProvince = '',
    selectedHarvestWindow = 'ALL',
    selectedStatus = 'ALL',
    sortBy = 'EARLIEST_HARVEST',
  } = params

  return listings
    .filter((item) => {
      // Keyword filter
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase().trim()
        const matchName = item.cropName.toLowerCase().includes(query)
        const matchVariety = item.variety.toLowerCase().includes(query)
        const matchFarmer = item.farmerName.toLowerCase().includes(query)
        if (!matchName && !matchVariety && !matchFarmer) return false
      }

      // Province filter
      if (selectedProvince && item.provinceCode !== selectedProvince) {
        return false
      }

      // Harvest window filter
      if (selectedHarvestWindow === '15' && item.daysUntilHarvest > 15) return false
      if (selectedHarvestWindow === '30' && item.daysUntilHarvest > 30) return false
      if (selectedHarvestWindow === '45' && item.daysUntilHarvest > 45) return false

      // Status filter
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === 'EARLIEST_HARVEST') {
        return a.daysUntilHarvest - b.daysUntilHarvest
      }
      if (sortBy === 'QUANTITY_DESC') {
        return b.availableQuantityKg - a.availableQuantityKg
      }
      if (sortBy === 'QUANTITY_ASC') {
        return a.availableQuantityKg - b.availableQuantityKg
      }
      return 0
    })
}
