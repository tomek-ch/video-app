import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
} from "reactstrap";
import { useVideosContext } from "../context/VideosContext";
import useToggle from "../hooks/useToggle";

function Header() {
  const {
    loadDemoData,
    wipeData,
    favoritesOnly,
    toggleFavFilter,
    toggleOldestFirst,
    oldestFirst,
    isGrid,
    toggleGrid,
  } = useVideosContext();
  const [dropdownOpen, toggleDropdown] = useToggle();

  return (
    <header className="d-flex align-items-center justify-content-between my-3 top">
      <h1>Video App</h1>
      <nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret className="ms-auto">
            Menu
          </DropdownToggle>
          <DropdownMenu className="mt-1" right>
            <DropdownItem onClick={wipeData}>Delete all videos</DropdownItem>
            <DropdownItem onClick={loadDemoData}>Load demo videos</DropdownItem>
            <DropdownItem divider />
            <Label check className="px-3 py-1">
              <Input
                type="checkbox"
                checked={favoritesOnly}
                onChange={toggleFavFilter}
                className="me-1"
              />
              Favorites only
            </Label>
            <Label check className="px-3 py-1">
              <Input
                type="checkbox"
                checked={oldestFirst}
                onChange={toggleOldestFirst}
                className="me-1"
              />
              Oldest first
            </Label>
            <Label check className="px-3 py-1">
              <Input
                type="checkbox"
                checked={isGrid}
                onChange={toggleGrid}
                className="me-1"
              />
              Grid view
            </Label>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </header>
  );
}

export default Header;
