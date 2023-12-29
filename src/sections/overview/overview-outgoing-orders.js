import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import ArchiveBoxArrowDownIcon from "@heroicons/react/24/solid/ArchiveBoxArrowDownIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewOutgoingOrders = (props) => {
  const { difference, positive = false, sx, value, transform } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {transform ? `Hàng chuyển đi` : `Hàng nhận`}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ArchiveBoxArrowDownIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewOutgoingOrders.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
  transform: PropTypes.bool,
};
