import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
} from "reactstrap";
import { useVideosContext } from "../context/VideosContext";

function Header() {
  const {
    loadDemoData,
    wipeData,
    favoritesOnly,
    toggleFavFilter,
    toggleOldestFirst,
    oldestFirst,
  } = useVideosContext();
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const toggle = () => setDropDownOpen((prev) => !prev);

  return (
    <header className="d-flex align-items-center justify-content-between my-3">
      <h1>Video App</h1>
      <nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret className="ms-auto">
            Menu
          </DropdownToggle>
          <DropdownMenu className="mt-1" right>
            <DropdownItem onClick={wipeData}>Delete all videos</DropdownItem>
            <DropdownItem onClick={loadDemoData}>Load demo videos</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Label check>
                <Input
                  type="checkbox"
                  checked={favoritesOnly}
                  onChange={toggleFavFilter}
                  className="me-1"
                />
                Favorites only
              </Label>
            </DropdownItem>
            <DropdownItem>
              <Label check>
                <Input
                  type="checkbox"
                  checked={oldestFirst}
                  onChange={toggleOldestFirst}
                  className="me-1"
                />
                Oldest first
              </Label>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
