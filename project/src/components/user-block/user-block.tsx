import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/action';
import AuthStatus from '../../types/auth-status.enum';

export default function UserBlock() {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.avatar);
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  if (authStatus !== AuthStatus.Authorized) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link className="user-block__link" to={'/login'}>
            Login
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatar || ''} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          to="/"
          className="user-block__link"
          onClick={(event) => {
            event.preventDefault();
            dispatch(logout());
          }}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}