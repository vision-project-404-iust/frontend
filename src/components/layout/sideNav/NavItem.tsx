import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { NavItemConfig } from "./types";
import { useSideNav } from "./SideNavContext";
import { ArrowDownward } from "@mui/icons-material";

interface NavItemProps {
  item: NavItemConfig;
}

export const NavItem: React.FC<NavItemProps> = React.memo(({ item }) => {
  // --- Hooks & Context ---
  const { text, icon, children, path, onClick, getIcon } = item;
  const { minimized, onSideNavClose, selectedMap, selectedVariant } =
    useSideNav();
  const theme = useTheme();

  // --- Internal State & Variables ---
  const isSelected = !!selectedMap[item.path || ""];
  const hasChildren = !!item.children?.length;

  const [open, setOpen] = useState(isSelected);

  // --- Event Handlers & Effects ---
  const handleClick = useCallback(() => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      onSideNavClose?.();
    }
    onClick?.();
  }, [hasChildren, onSideNavClose, onClick]);

  useEffect(() => {
    if (hasChildren) {
      setOpen(isSelected);
    }
  }, [isSelected, hasChildren]);

  // --- Render Logic ---
  const listItemProps = path
    ? { component: Link, to: path }
    : { component: "div" };
  const isPrimary = selectedVariant === "primary";
  const hasIcon = icon || getIcon;

  const listItemIcon = {
    minWidth: 0,
    mr: minimized ? 0 : 4,
    ml: 0,
    justifyContent: "center",
    ...(isSelected &&
      !isPrimary && {
        color: "primary.main",
      }),
  };

  // --- Styles ---
  const expandIcon = {
    display: "flex",
    alignItems: "center",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  };

  return (
    <>
      <ListItemButton
        {...listItemProps}
        onClick={handleClick}
        selected={isSelected && isPrimary}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          ...(isSelected &&
            !isPrimary && {
              color: "primary.main",
            }),
        }}
      >
        {hasIcon && (
          <ListItemIcon sx={listItemIcon}>
            {getIcon ? getIcon(isSelected) : icon}
          </ListItemIcon>
        )}
        {!minimized && <ListItemText primary={text} />}
        {!minimized && children && children.length > 0 ? (
          <Box
            component="span"
            sx={expandIcon}
          >
            <ArrowDownward />
          </Box>
        ) : null}
      </ListItemButton>
      {!minimized && children && children.length > 0 && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            disablePadding
            sx={{ pl: 3 }}
          >
            {children.map((child, index) => (
              <NavItem
                key={child.path || `${child.text}-${index}`}
                item={child}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
});
