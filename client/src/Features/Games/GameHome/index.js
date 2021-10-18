import React from 'react';
import './gameHome.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Link from '@material-ui/core/Link';
import Image from 'images/whac-a-mole.png';

export default function MediaCard() {
  return (
    <div class="cards">
      <div class="card">
        <img src={Image} alt="" class="card-image" />
        <div class="card-content">
          <div class="card-top">
            <h3 class="card-title">2020 World Champs Gaming Warzone</h3>
          </div>
          <div class="card-bottom">
            <Link href="/games/whac-a-mole">
              <div class="card-live">
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
