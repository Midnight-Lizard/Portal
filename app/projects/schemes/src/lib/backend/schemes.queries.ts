import gql from 'graphql-tag';

export const listQuery = gql`
  query {
    search(pageSize: 99) {
      results { id name }
    }
  }
`;

export const detailsQuery = gql`
  query ($id: ID, $currentUserId: ID) {
    details(id: $id) {
      id
      name
      description
      generation
      likes
      liked(by: $currentUserId)
      favorited(by: $currentUserId)
      publisher {
        id
        name
        community
      }
      screenshots {
        title
        urls { xs sm md lg xl }
      }
      colorScheme {
        colorSchemeId
        colorSchemeName
        runOnThisSite
        blueFilter
        useDefaultSchedule
        scheduleStartHour
        scheduleFinishHour
        backgroundSaturationLimit
        backgroundContrast
        backgroundLightnessLimit
        backgroundGraySaturation
        backgroundGrayHue
        textSaturationLimit
        textContrast
        textLightnessLimit
        textGraySaturation
        textGrayHue
        textSelectionHue
        linkSaturationLimit
        linkContrast
        linkLightnessLimit
        linkDefaultSaturation
        linkDefaultHue
        linkVisitedHue
        borderSaturationLimit
        borderContrast
        borderLightnessLimit
        borderGraySaturation
        borderGrayHue
        imageLightnessLimit
        imageSaturationLimit
        backgroundImageLightnessLimit
        backgroundImageSaturationLimit
        scrollbarSaturationLimit
        scrollbarContrast
        scrollbarLightnessLimit
        scrollbarGrayHue
        buttonSaturationLimit
        buttonContrast
        buttonLightnessLimit
        buttonGraySaturation
        buttonGrayHue
        backgroundReplaceAllHues
        borderReplaceAllHues
        buttonReplaceAllHues
        linkReplaceAllHues
        textReplaceAllHues
        useImageHoverAnimation
        scrollbarSize
        doNotInvertContent
        mode
        modeAutoSwitchLimit
        includeMatches
        excludeMatches
        backgroundHueGravity
        buttonHueGravity
        textHueGravity
        linkHueGravity
        borderHueGravity
        scrollbarStyle
        maxBackgroundImageSize
        hideBigBackgroundImages
      }
    }
  }
`;

export const searchQuery = gql`
  query ($query: String, $side: SchemeSide, $bg: HueFilter, $list: SchemeList, $currentUserId: ID, $cursor: String, $pageSize: Int) {
    search(query: $query, side: $side, bg: $bg, list: $list, currentUserId: $currentUserId, cursor: $cursor, pageSize: $pageSize) {
      cursor
      done
      results {
        id
        name
        likes
        liked(by: $currentUserId)
        favorited(by: $currentUserId)
        publisher {
          id
          name
          community
        }
        screenshots {
          title
          urls { xs sm md lg xl }
        }
      }
    }
  }
`;
