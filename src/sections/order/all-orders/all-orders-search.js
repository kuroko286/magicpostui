import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  TextField,
  MenuItem,
  Button,
  useMediaQuery,
} from '@mui/material';

export const AllOrdersSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  

  const handleSearch = () => {
    onSearch({
      searchTerm,
      selectedType,
      selectedStatus,
    });
  };

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  return (
    <Card sx={{ p: 2 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Nhập mã đơn hàng"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{
            width: isSmallScreen ? '100%' : 'calc(50% - 4px)',
            marginBottom: isSmallScreen ? '8px' : '0px',
            marginRight: isSmallScreen ? '0px' : '8px',
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              minWidth: isSmallScreen ? '100%' : '120px',
              marginTop: isSmallScreen ? '8px' : '0px',
            }}
          >
            Tìm kiếm
          </Button>
        {/* </div> */}
      </div>
    </Card>
  );
}; 