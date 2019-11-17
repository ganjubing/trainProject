export default[
  {
    path: '/train/division',
    name: 'DivisionIndex',
    component: () => import('@/components/train/division/index.vue'),
    meta: {
      title: '12、除法风暴',
      isTitle: true,
    },
  },
  {
    path: '/train/division/caption',
    name: 'DivisionCaption',
    component: () => import('@/components/train/division/caption.vue'),
    meta: {
      title: '除法风暴-说明',
      isTitle: false,
    }
  },
  {
    path: '/train/division/divisionStorm',
    name: 'DivisionStorm',
    component: () => import('@/components/train/division/divisionStorm.vue'),
    meta: {
      title: '除法风暴',
      isTitle: false,
    }
  },

{
    path: '/train/words',
    name: 'WordIndex',
    component: () => import('@/components/train/words/index.vue'),
    meta: {
      title: '16、文字回溯',
      isTitle: true,
    },
  },
  {
    path: '/train/words/caption',
    name: 'WordCaption',
    component: () => import('@/components/train/words/caption.vue'),
    meta: {
      title: '文字回溯-说明',
      isTitle: false,
    }
  },
  {
    path: '/train/words/wordRecall',
    name: 'WordRecall',
    component: () => import('@/components/train/words/wordRecall.vue'),
    meta: {
      title: '文字回溯',
      isTitle: false,
    }
  },

  {
      path: '/train/visualSpace',
      name: 'VisualSpaceIndex',
      component: () => import('@/components/train/visualSpace/index.vue'),
      meta: {
        title: '15、视空间回溯',
        isTitle: true,
      },
    },
    {
      path: '/train/visualSpace/caption',
      name: 'VisualSpaceCaption',
      component: () => import('@/components/train/visualSpace/caption.vue'),
      meta: {
        title: '视空间回溯-说明',
        isTitle: false,
      }
    },
    {
      path: '/train/visualSpace/visualSpace',
      name: 'VisualSpace',
      component: () => import('@/components/train/visualSpace/visualSpace.vue'),
      meta: {
        title: '视空间回溯',
        isTitle: false,
      }
    },

    {
        path: '/train/sequence',
        name: 'SequenceIndex',
        component: () => import('@/components/train/sequence/index.vue'),
        meta: {
          title: '23、序列组合',
          isTitle: true,
        },
      },
      {
        path: '/train/sequence/caption',
        name: 'SequenceCaption',
        component: () => import('@/components/train/sequence/caption.vue'),
        meta: {
          title: '序列组合-说明',
          isTitle: false,
        }
      },
      {
        path: '/train/sequence/sequenceCombination',
        name: 'SequenceCombination',
        component: () => import('@/components/train/sequence/sequenceCombination.vue'),
        meta: {
          title: '序列组合',
          isTitle: false,
        }
      },
]
