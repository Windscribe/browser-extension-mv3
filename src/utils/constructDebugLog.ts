export default (level = 'INFO', activity: string, message: string): string => {
  const time = new Date()
  //   '[Start of log]\n------------------------------------------------------\n')

  return `${time} [[${level}] [${activity}] - ${message} \n`
}
