export default ({ type }) => {
  return {
    visible: type === 'span',
    type: 'hidden',
    key: 'style.display',
    config: {
      initialValue: 'inline-block'
    }
  }
}