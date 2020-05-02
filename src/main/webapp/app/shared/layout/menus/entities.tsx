import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/my-user">
      <Translate contentKey="global.menu.entities.myUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/appointment">
      <Translate contentKey="global.menu.entities.appointment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cabinet">
      <Translate contentKey="global.menu.entities.cabinet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/consultation">
      <Translate contentKey="global.menu.entities.consultation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prescription">
      <Translate contentKey="global.menu.entities.prescription" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/drug-line">
      <Translate contentKey="global.menu.entities.drugLine" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/custom-line">
      <Translate contentKey="global.menu.entities.customLine" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/drug">
      <Translate contentKey="global.menu.entities.drug" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/one-string">
      <Translate contentKey="global.menu.entities.oneString" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/medical-certificat">
      <Translate contentKey="global.menu.entities.medicalCertificat" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/insurance">
      <Translate contentKey="global.menu.entities.insurance" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
