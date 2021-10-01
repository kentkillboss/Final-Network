import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};
const useStyles = makeStyles((them) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    padding: 0,
    margin: them.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: them.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hang mien phi',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Co khuyen mai',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) => `Tu ${filters.salePrice_gte} den ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => filters['category.name'],
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      delete newFilters['category.name'];
      return newFilters;
    },
    onToggle: null,
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            size="small"
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          ></Chip>
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
