import React from 'react';
import './gameHome.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Link from '@material-ui/core/Link';
import Image from 'images/whac-a-mole.png';
import { useSelector } from 'react-redux';

export default function MediaCard() {
  const {theme} = useSelector(state => state);
  return (
    <div class="cards">
      <div class="card">
        <img src={Image} alt="" class="card-image" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
        <div class="card-content">
          <div class="card-top">
            <h3 class="card-title">2020 World Champs Gaming Warzone</h3>
          </div>
          <div class="card-bottom">
            <Link href="/games/whac-a-mole">
              <div class="card-live" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} >
                <PlayArrowIcon />
                <span>Chơi</span>
              </div>
            </Link>
            <div class="card-watching">4.2k Đánh giá</div>
          </div>
        </div>
      </div>
    </div>
  );
}
